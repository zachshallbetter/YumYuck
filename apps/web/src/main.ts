import { createIcons, Compass, Settings, User, Sparkles } from "lucide";
import { getCachedMealCatalog, cacheMealCatalog, clearMealCatalog, getPreferenceSignals, savePreferenceSignal, clearSessionPreferenceSignals } from "./db/indexedDb.js";
import { MealVariant, PreferenceSignal, DinnerInteractionContract } from "./db/schema.js";

// Import Web Components to register them
import "./components/CapsuleIndicator.js";
import "./components/MealCard.js";
import "./components/CardStack.js";
import "./components/UserProfileView.js";
import "./components/MealDetailView.js";
import "./components/SummarySheet.js";

export class YumYuckApp extends HTMLElement {
  // State
  private session: DinnerInteractionContract | null = null;
  private catalogMeals: MealVariant[] = [];
  private currentStackMeals: MealVariant[] = [];
  private recommendations: { meal: MealVariant; score: number; profile: any }[] = [];
  
  private currentIndex = 0;
  private showProfile = false;
  private showDetails = false;
  private showSummary = false;
  private isCatalogEmpty = true;
  private isGenerating = false;
  private isLifted = false;
  private activeDetailMeal: MealVariant | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Bind event handlers
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handlePreferencesUpdated = this.handlePreferencesUpdated.bind(this);
    this.handleRegenerateCatalog = this.handleRegenerateCatalog.bind(this);
    this.handleModifyRecipe = this.handleModifyRecipe.bind(this);
    this.handleOutcomeRecorded = this.handleOutcomeRecorded.bind(this);
    this.handleSessionReset = this.handleSessionReset.bind(this);
  }

  async connectedCallback() {
    await this.initApp();
  }

  private async initApp() {
    // Clean old session signals to prevent tag overlap
    await clearSessionPreferenceSignals();

    const cached = await getCachedMealCatalog();
    if (cached && cached.length > 0) {
      this.catalogMeals = cached;
      this.isCatalogEmpty = false;
      await this.startNewSession();
    } else {
      this.isCatalogEmpty = true;
      this.render();
    }
  }

  private async startNewSession() {
    const sessionId = `session-${Math.random().toString(36).substr(2, 9)}`;
    this.session = {
      id: sessionId,
      initiatorId: "partner-user",
      timestamp: new Date().toISOString(),
      activeDietaryRestrictions: [],
      maxOptions: 8,
      status: "active",
      schemaVersion: "1.0.0"
    };

    this.currentIndex = 0;
    this.showSummary = false;
    this.showDetails = false;
    this.showProfile = false;

    // Log Session Start event
    await this.postLedgerEvent({
      id: `evt-${Math.random().toString(36).substr(2, 9)}`,
      sessionId: this.session.id,
      timestamp: new Date().toISOString(),
      eventType: "session_started",
      projectionVersion: "1.0.0",
      candidateSetHash: this.getSetHash(this.catalogMeals.map(m => m.id)),
      preferenceStateHash: "",
      experimentCondition: "B",
      protocolVersion: "1.0.0"
    });

    // Shuffle catalog and generate recommendations
    this.currentStackMeals = this.shuffleArray([...this.catalogMeals]).slice(0, 8);
    await this.recalculateRecommendations();
    this.render();
  }

  private async recalculateRecommendations() {
    const signals = await getPreferenceSignals("partner-user");
    
    // Score all catalog meals
    const scored = this.catalogMeals.map(meal => {
      const { score, profile } = this.scoreMeal(meal, signals);
      return { meal, score, profile };
    });

    // Sort by weighted percentage
    this.recommendations = scored
      .filter(item => item.score >= 0) // exclude dietary blocked ones
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // top 5 choices in Wallet list
  }

  private scoreMeal(meal: MealVariant, signals: PreferenceSignal[]) {
    // 1. Check permanent dietary restrictions
    const dietaryBlocks = signals.filter(s => s.target.entityType === "dietary" && s.sentiment === "nope");
    for (const block of dietaryBlocks) {
      if (meal.dietaryFlags.includes(block.target.entityId)) {
        return { score: -1, profile: null }; // completely blocked!
      }
    }

    let score = 50; // base score

    // Swipes session weight: 50%
    const sessionSignals = signals.filter(s => s.scope === "session");
    for (const sig of sessionSignals) {
      const proteinMatch = sig.target.entityType === "protein" && sig.target.entityId === meal.primaryProteinId;
      const ingredientMatch = sig.target.entityType === "ingredient" && (meal.ingredientIds.includes(sig.target.entityId) || meal.sideIngredientIds.includes(sig.target.entityId));
      const formatMatch = sig.target.entityType === "format" && sig.target.entityId === meal.format;
      const flavorMatch = sig.target.entityType === "flavor" && meal.experienceTags.some(t => t.toLowerCase().includes(sig.target.entityId.toLowerCase()));

      if (proteinMatch || ingredientMatch || formatMatch || flavorMatch) {
        score += sig.sentiment === "yum" ? 15 : -15;
      }
    }

    // Persistent profile weight: 30%
    const persistentSignals = signals.filter(s => s.scope === "persistent");
    for (const sig of persistentSignals) {
      const proteinMatch = sig.target.entityType === "protein" && sig.target.entityId === meal.primaryProteinId;
      const ingredientMatch = sig.target.entityType === "ingredient" && (meal.ingredientIds.includes(sig.target.entityId) || meal.sideIngredientIds.includes(sig.target.entityId));
      const formatMatch = sig.target.entityType === "format" && sig.target.entityId === meal.format;
      const flavorMatch = sig.target.entityType === "flavor" && meal.experienceTags.some(t => t.toLowerCase().includes(sig.target.entityId.toLowerCase()));

      if (proteinMatch || ingredientMatch || formatMatch || flavorMatch) {
        score += sig.sentiment === "yum" ? 10 : -10;
      }
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      profile: {
        displayPercentage: score,
        supportingSignals: signals.filter(s => s.sentiment === "yum" && (s.target.entityId === meal.primaryProteinId || meal.ingredientIds.includes(s.target.entityId))),
        conflictingSignals: signals.filter(s => s.sentiment === "nope" && (s.target.entityId === meal.primaryProteinId || meal.ingredientIds.includes(s.target.entityId)))
      }
    };
  }

  private async handleSwipe(e: CustomEvent) {
    if (!this.session) return;
    const { meal, response } = e.detail;

    // Log swipes response_selected event
    const signals = await getPreferenceSignals("partner-user");
    await this.postLedgerEvent({
      id: `evt-${Math.random().toString(36).substr(2, 9)}`,
      sessionId: this.session.id,
      timestamp: new Date().toISOString(),
      eventType: "response_selected",
      projectionVersion: "1.0.0",
      opportunityId: `opp-${Math.random().toString(36).substr(2, 9)}`,
      candidateSetHash: this.getSetHash(this.currentStackMeals.map(m => m.id)),
      preferenceStateHash: this.getSetHash(signals.map(s => s.id)),
      response,
      experimentCondition: "B",
      protocolVersion: "1.0.0",
      mealId: meal.id
    });

    // Save swipe preference signal locally
    if (response === "yum" || response === "nope") {
      const prefSignal: PreferenceSignal = {
        id: `sig-session-${meal.id}-${Math.random().toString(36).substr(2, 5)}`,
        userId: "partner-user",
        target: {
          entityType: "protein",
          entityId: meal.primaryProteinId || "vegetarian_protein"
        },
        sentiment: response,
        strength: 1.0,
        scope: "session",
        source: "swipe-interaction",
        confidence: 1.0,
        createdAt: new Date().toISOString(),
        evidenceIds: [],
        reversible: true
      };
      await savePreferenceSignal(prefSignal);
    }

    this.currentIndex++;
    this.isLifted = false;

    if (this.currentIndex >= 8) {
      // Trigger matches wallet display summary screen
      this.showSummary = true;
    }

    await this.recalculateRecommendations();
    this.render();
  }

  private async handlePreferencesUpdated() {
    await this.recalculateRecommendations();
    this.render();
  }

  private async handleRegenerateCatalog() {
    if (confirm("Are you sure you want to clear your discoveries and rebuild the meal catalog?")) {
      await clearMealCatalog();
      this.isCatalogEmpty = true;
      this.showProfile = false;
      this.render();
    }
  }

  private async handleModifyRecipe(e: CustomEvent) {
    const { originalMealId, newMeal } = e.detail;
    
    // Replace the card dynamically in the deck
    this.currentStackMeals = this.currentStackMeals.map(m => m.id === originalMealId ? newMeal : m);
    this.activeDetailMeal = newMeal;
    
    await this.recalculateRecommendations();
    this.render();
  }

  private async handleOutcomeRecorded(e: CustomEvent) {
    if (!this.session) return;
    const { mealId, rating, comments } = e.detail;

    // Log final satisfaction recorded event
    const signals = await getPreferenceSignals("partner-user");
    await this.postLedgerEvent({
      id: `evt-${Math.random().toString(36).substr(2, 9)}`,
      sessionId: this.session.id,
      timestamp: new Date().toISOString(),
      eventType: "outcome_recorded",
      projectionVersion: "1.0.0",
      candidateSetHash: this.getSetHash(this.currentStackMeals.map(m => m.id)),
      preferenceStateHash: this.getSetHash(signals.map(s => s.id)),
      experimentCondition: "B",
      protocolVersion: "1.0.0",
      mealId,
      metadata: { rating, comments }
    });
  }

  private async handleSessionReset() {
    await this.startNewSession();
  }

  private async handleGenerateCatalog() {
    this.isGenerating = true;
    this.render();

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: `You are a premium culinary research chef and structured data assistant for "YumYuck", an award-winning iOS dinner discovery app.
Your task is to generate exactly 20 diverse, high-quality, gourmet dinner recipes in structured JSON format conforming to the schema of MealVariant[].

Guidelines from YumYuck official reference sheets:
1. PROTEINS (ingredients.png): salmon, cod, halibut, shrimp, scallops, chicken, turkey, beef, pork, tofu.
2. VEGETABLES: green_beans, zucchini, broccoli, asparagus, mushrooms, bell_preppers, onions, garlic, spinach, kale, cabbage.
3. STARCHES: potatoes, sweet_potatoes, rice, quinoa, pasta, udon_noodles, angel_hair.
4. PREPARATION (preperation.png): grilled, seared, pan_seared, roasted, braised, stir_fried, baked, sauteed, steamed.
5. FLAVORS (meal-type.png): fresh_light, garlic_herb, savory_earthy, rich_buttery, spicy, citrus, umami.
6. OCCASIONS: comforting, healthy_choice, special_occasion, quick_easy.
7. FORMATS (food.png): plate, bowl, handheld, pasta, soup, salad.
8. Set primaryProteinId to exactly one of the official protein category keys: 'seafood', 'poultry', 'red_meat', 'pork', 'shellfish', 'vegetarian_protein', 'plant_based'. (Vegetarian or vegan meals without active proteins should set it to 'vegetarian_protein' or 'plant_based').

Visual & Image Mappings:
To ensure perfect visual layout alignment, you MUST map each meal's "imageAssetId" to one of the following verified Unsplash URLs:
- Grilled Salmon: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600"
- Lemon Garlic Salmon: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600"
- Chicken Piccata: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600"
- Chicken Piccata Pasta: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600"
- Seared Cod / White Fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600"
- Shrimp Scampi: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600"
- Seared Scallops: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600"
- Filet Mignon / Steak: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600"
- Steak with Rosemary: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=600"
- Sesame Ginger Tofu: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
- Creamy Mushroom Pasta: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600"
- Chicken Teriyaki: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=600"
- Quinoa Salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600"
- Herb Chicken: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600"
- Garlic Roasted Chicken: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600"
- Pesto Pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600"
- Pesto Chicken Pasta: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=600"
- Garlic Shrimp: "https://images.unsplash.com/photo-1559742811-8242895411b8?auto=format&fit=crop&q=80&w=600"
- Tuscan Bean Soup: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600"
- Beef Bowl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=600"
- Beef Tacos: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600"
- Chickpea Salad: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
- Tomato Soup: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600"
- Chicken Skewers: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600"
- Creamy Garlic Pasta: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600"

Make sure that you use ONLY these exact image URLs and match them logically to the generated recipe (e.g. do not assign the salmon URL to a chicken salad).
Ensure the experienceTags array contains exactly 3 elements, consisting of short descriptors like a primary ingredient/prep detail, format/mood, and duration (e.g. ['Lemon', 'Light', '25 min']). Output exactly 20 dinner variants in a single JSON array.`,
          prompt: "Generate exactly 20 diverse, premium dinner meals for the catalog.",
          schema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                id: { type: "STRING" },
                familyId: { type: "STRING" },
                name: { type: "STRING" },
                description: { type: "STRING" },
                primaryProteinId: { type: "STRING", nullable: true },
                ingredientIds: { type: "ARRAY", items: { type: "STRING" } },
                sideIngredientIds: { type: "ARRAY", items: { type: "STRING" } },
                substitutionIds: { type: "ARRAY", items: { type: "STRING" } },
                dietaryFlags: { type: "ARRAY", items: { type: "STRING" } },
                allergenFlags: { type: "ARRAY", items: { type: "STRING" } },
                richnessScore: { type: "NUMBER" },
                healthScore: { type: "NUMBER" },
                imageAssetId: { type: "STRING" },
                status: { type: "STRING", enum: ["candidate", "validated", "proven", "archived"] },
                temperature: { type: "STRING", enum: ["hot", "warm", "cold", "room_temperature"] },
                format: { type: "STRING", enum: ["plate", "bowl", "pasta", "soup", "salad", "handheld"] },
                estimatedMinutes: { type: "NUMBER" },
                difficulty: { type: "NUMBER" },
                experienceTags: { type: "ARRAY", items: { type: "STRING" } }
              },
              required: [
                "id",
                "familyId",
                "name",
                "description",
                "ingredientIds",
                "sideIngredientIds",
                "substitutionIds",
                "dietaryFlags",
                "allergenFlags",
                "richnessScore",
                "healthScore",
                "imageAssetId",
                "status",
                "temperature",
                "format",
                "estimatedMinutes",
                "difficulty",
                "experienceTags"
              ]
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate catalog from Gemini");
      }

      const generatedMeals: MealVariant[] = await response.json();
      if (Array.isArray(generatedMeals) && generatedMeals.length > 0) {
        await cacheMealCatalog(generatedMeals);
        this.catalogMeals = generatedMeals;
        this.isCatalogEmpty = false;
        await this.startNewSession();
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while generating catalog menu: " + (err as Error).message);
    } finally {
      this.isGenerating = false;
      this.render();
    }
  }

  private async postLedgerEvent(event: any) {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
      });
    } catch (e) {
      console.warn("Failed to post event to server ledger", e);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private getSetHash(ids: string[]): string {
    return ids.sort().join(",");
  }

  render() {
    const style = `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 390px;
        height: 100vh;
        margin: 0 auto;
        position: relative;
        background-color: #F8F5EF;
        overflow: hidden;
      }
      
      .main-layout {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 16px 20px;
        position: relative;
        z-index: 10;
        transition: filter 0.3s ease;
      }
      .main-layout.lifted-blur {
        filter: blur(4px);
      }

      /* Header */
      .header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        width: 100%;
        z-index: 20;
      }
      .icon-btn {
        background: none;
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        color: #1E201E;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-btn:active {
        background-color: rgba(0,0,0,0.05);
        transform: scale(0.95);
      }
      .logo-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .logo-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 18px;
        font-weight: 700;
        color: #2C5E43;
        letter-spacing: 0.5px;
      }

      /* Stack Deck */
      .deck-area {
        flex: 1;
        width: 100%;
        position: relative;
        margin-bottom: 24px;
      }

      /* Onboarding On-Demand catalog generator */
      .onboarding-card {
        background-color: #FFFFFF;
        border-radius: 24px;
        padding: 32px 24px;
        box-shadow: 0 12px 32px -8px rgba(30, 32, 30, 0.08);
        border: 1px solid rgba(30,32,30,0.06);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 80%;
        margin-top: 10%;
        gap: 16px;
      }
      .onboarding-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        color: #2C5E43;
      }
      .onboarding-desc {
        font-size: 13px;
        line-height: 1.5;
        color: #5A5D5A;
      }
      .onboarding-btn {
        background-color: #2C5E43;
        border: none;
        color: #FFFFFF;
        border-radius: 14px;
        padding: 14px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ease;
      }
      .onboarding-btn:active {
        background-color: #204531;
      }
      .onboarding-btn:disabled {
        background-color: rgba(30,32,30,0.15);
        color: rgba(30,32,30,0.3);
        cursor: not-allowed;
      }

      /* Sliding Drawers */
      .drawer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 85vh;
        z-index: 100;
        background-color: #F8F5EF;
        border-top-left-radius: 32px;
        border-top-right-radius: 32px;
        box-shadow: 0 -16px 48px rgba(30, 32, 30, 0.15);
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .drawer.open {
        transform: translateY(0);
      }
      .drawer-bar {
        width: 36px;
        height: 5px;
        background-color: rgba(30,32,30,0.15);
        border-radius: 999px;
        margin: 10px auto 0 auto;
      }
      
      .spinner {
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid #FFFFFF;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 0.8s linear infinite;
        display: inline-block;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    // Indicators bar configuration
    const activeIndex = Math.min(this.currentIndex + 1, 8);
    const renderIndicator = !this.showSummary && !this.isCatalogEmpty;

    let headerHtml = "";
    if (this.isCatalogEmpty) {
      headerHtml = `
        <div class="logo-row" style="margin: 0 auto;">
          <i data-lucide="compass" style="color:#2C5E43;width:18px;height:18px;"></i>
          <span class="logo-title">YUMYUCK</span>
        </div>
      `;
    } else {
      headerHtml = `
        <button class="icon-btn" id="btn-settings">
          <i data-lucide="settings" style="width:20px;height:20px;"></i>
        </button>
        ${renderIndicator ? `
          <capsule-indicator current="${activeIndex}" total="8"></capsule-indicator>
        ` : `
          <div class="logo-row">
            <i data-lucide="compass" style="color:#2C5E43;width:18px;height:18px;" class="animate-pulse"></i>
            <span class="logo-title">YUMYUCK</span>
          </div>
        `}
        <button class="icon-btn" id="btn-user">
          <i data-lucide="user" style="width:20px;height:20px;"></i>
        </button>
      `;
    }

    let deckHtml = "";
    if (this.isCatalogEmpty) {
      deckHtml = `
        <div class="onboarding-card">
          <div style="font-size: 50px;">🍽</div>
          <h3 class="onboarding-title">Create Your Menu</h3>
          <p class="onboarding-desc">
            Let our premium culinary AI compose a dynamic discovery deck of 20 gourmet meals tailored specifically to your taste profile.
          </p>
          <button class="onboarding-btn" id="btn-create-menu" ${this.isGenerating ? "disabled" : ""}>
            ${this.isGenerating ? '<div class="spinner"></div>' : '<i data-lucide="sparkles" style="width:16px;height:16px"></i> Generate Discoveries'}
          </button>
        </div>
      `;
    } else {
      // Remaining swiping deck slice
      const remainingMeals = this.currentStackMeals.slice(this.currentIndex);
      deckHtml = `<card-stack id="stack-view"></card-stack>`;
    }

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      
      <!-- Main Layout -->
      <div class="main-layout ${this.isLifted ? "lifted-blur" : ""}">
        <header class="header-bar">
          ${headerHtml}
        </header>

        <div class="deck-area">
          ${deckHtml}
        </div>
      </div>

      <!-- Drawers -->
      
      <!-- Drawer 1: User Profile Settings -->
      <div class="drawer ${this.showProfile ? "open" : ""}" id="drawer-profile">
        <div class="drawer-bar"></div>
        <div style="height:100%">
          <user-profile-view id="profile-view"></user-profile-view>
        </div>
      </div>

      <!-- Drawer 2: Meal Detail View -->
      <div class="drawer ${this.showDetails ? "open" : ""}" id="drawer-details">
        <div class="drawer-bar"></div>
        <div style="height:100%">
          <meal-detail-view id="detail-view"></meal-detail-view>
        </div>
      </div>

      <!-- Drawer 3: Summary Sheet Matches -->
      <div class="drawer ${this.showSummary ? "open" : ""}" id="drawer-summary">
        <div class="drawer-bar"></div>
        <div style="height:100%">
          <summary-sheet id="summary-view"></summary-sheet>
        </div>
      </div>
    `;

    // Hook up active deck stack properties
    const stackView = this.shadowRoot!.querySelector("#stack-view") as any;
    if (stackView) {
      stackView.meals = this.currentStackMeals.slice(this.currentIndex);
    }

    // Hook up subcomponents data
    const profileView = this.shadowRoot!.querySelector("#profile-view") as any;
    if (profileView) {
      getPreferenceSignals("partner-user").then(sigs => {
        profileView.preferenceSignals = sigs;
      });
    }

    const detailView = this.shadowRoot!.querySelector("#detail-view") as any;
    if (detailView && this.activeDetailMeal) {
      detailView.meal = this.activeDetailMeal;
      getPreferenceSignals("partner-user").then(sigs => {
        detailView.preferenceSignals = sigs;
        
        // Find avoided allergens
        const avoidedAllergens = sigs
          .filter(s => s.target.entityType === "dietary" && s.sentiment === "nope")
          .map(s => s.target.entityId);
        detailView.avoidAllergens = avoidedAllergens;
      });
    }

    const summaryView = this.shadowRoot!.querySelector("#summary-view") as any;
    if (summaryView) {
      summaryView.recommendations = this.recommendations;
      getPreferenceSignals("partner-user").then(sigs => {
        summaryView.preferenceSignals = sigs;
      });
    }

    // Hook up Lucide icons
    createIcons({
      icons: { Compass, Settings, User, Sparkles },
      nameAttr: "data-lucide",
      root: this.shadowRoot as any
    });

    // Onboarding creation click
    const createBtn = this.shadowRoot!.querySelector("#btn-create-menu");
    if (createBtn) {
      createBtn.addEventListener("click", () => {
        this.handleGenerateCatalog();
      });
    }

    // Top buttons toggle handlers
    const settingsBtn = this.shadowRoot!.querySelector("#btn-settings");
    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        this.showProfile = true;
        this.showDetails = false;
        this.render();
      });
    }

    const userBtn = this.shadowRoot!.querySelector("#btn-user");
    if (userBtn) {
      userBtn.addEventListener("click", () => {
        this.showSummary = true;
        this.render();
      });
    }

    // Event listeners from custom elements
    this.addEventListener("swipe", this.handleSwipe as EventListener);
    this.addEventListener("preferences-updated", this.handlePreferencesUpdated as EventListener);
    this.addEventListener("regenerate-catalog", this.handleRegenerateCatalog as EventListener);
    this.addEventListener("recipe-modified", this.handleModifyRecipe as EventListener);
    this.addEventListener("outcome-recorded", this.handleOutcomeRecorded as EventListener);
    this.addEventListener("session-reset", this.handleSessionReset as EventListener);

    // Profile sheet close
    this.addEventListener("profile-close", () => {
      this.showProfile = false;
      this.render();
    });

    // Details sheet open / close
    this.addEventListener("card-click", (e: any) => {
      this.activeDetailMeal = e.detail.meal;
      this.showDetails = true;
      this.render();
    });

    this.addEventListener("details-close", () => {
      this.showDetails = false;
      this.activeDetailMeal = null;
      this.render();
    });

    // Hold lift background blur triggers
    this.addEventListener("card-lift", () => {
      this.isLifted = true;
      const layout = this.shadowRoot!.querySelector(".main-layout");
      if (layout) layout.classList.add("lifted-blur");
    });

    this.addEventListener("card-release", () => {
      this.isLifted = false;
      const layout = this.shadowRoot!.querySelector(".main-layout");
      if (layout) layout.classList.remove("lifted-blur");
    });
  }
}

customElements.define("yumyuck-app", YumYuckApp);
export default YumYuckApp;
