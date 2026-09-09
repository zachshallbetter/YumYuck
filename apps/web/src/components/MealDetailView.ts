import { createIcons, ArrowLeft, Sparkles, Clock, Flame, ShieldAlert } from "lucide";
import { MealVariant, MealVariantSchema } from "../db/schema.js";
import { getFoodImage } from "../db/seedMeals.js";
import { cacheMealCatalog } from "../db/indexedDb.js";

export class MealDetailView extends HTMLElement {
  private _meal: MealVariant | null = null;
  private _preferenceSignals: any[] = [];
  private _avoidAllergens: string[] = [];
  
  // Drill-down variation state
  private modifiedMeal: MealVariant | null = null;
  private isGenerating = false;

  set meal(value: MealVariant | null) {
    this._meal = value;
    this.modifiedMeal = null;
    this.render();
  }

  get meal() {
    return this._meal;
  }

  set preferenceSignals(value: any[]) {
    this._preferenceSignals = value;
  }

  set avoidAllergens(value: string[]) {
    this._avoidAllergens = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private getMatchingSignals(meal: MealVariant) {
    const current = meal.primaryProteinId || "vegetarian";
    
    const supporting = this._preferenceSignals.filter(
      s => (s.target.entityId === current && s.sentiment === "yum") ||
           (meal.ingredientIds.includes(s.target.entityId) && s.sentiment === "yum")
    );

    const conflicting = this._preferenceSignals.filter(
      s => (s.target.entityId === current && s.sentiment === "nope") ||
           (meal.ingredientIds.includes(s.target.entityId) && s.sentiment === "nope")
    );

    return { supporting, conflicting };
  }

  private async handleModifyRecipe(modification: string) {
    if (!this._meal || this.isGenerating) return;
    this.isGenerating = true;
    this.render();

    const parentMeal = this.modifiedMeal || this._meal;

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: `You are a premium culinary AI assistant for "YumYuck". Modify the provided meal according to the modification request.
Ensure that the modifications use vocabulary from our official reference sheets:
- Proteins (ingredients.png): salmon, cod, halibut, shrimp, scallops, chicken, turkey, beef, pork, tofu.
- Vegetables: green_beans, zucchini, broccoli, asparagus, mushrooms, bell_peppers, onions, garlic, spinach, kale, cabbage.
- Starches: potatoes, sweet_potatoes, rice, quinoa, pasta, udon_noodles, angel_hair.
- Preparations (preperation.png): grilled, seared, pan_seared, roasted, braised, stir_fried, baked, sauteed, steamed.
- Flavors (meal-type.png): fresh_light, garlic_herb, savory_earthy, rich_buttery, spicy, citrus, umami.

For matching rules, you MUST set primaryProteinId to exactly one of the official protein category keys: 'seafood', 'poultry', 'red_meat', 'pork', 'shellfish', 'vegetarian_protein', 'plant_based'.
Return exactly ONE JSON object conforming to the MealVariant schema. Ensure that it remains culinary-sound and appealing. Keep the id matching family guidelines (e.g. family-salmon). Set status to 'candidate'.`,
          prompt: `Parent Meal: ${JSON.stringify(parentMeal)}\nModification Request: "${modification}"`,
          schema: {
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
              temperature: { type: "STRING", enum: ["hot", "warm", "cold", "room_temperature"] },
              format: { type: "STRING", enum: ["plate", "bowl", "pasta", "soup", "salad", "handheld"] },
              estimatedMinutes: { type: "NUMBER" },
              difficulty: { type: "NUMBER" },
              experienceTags: { type: "ARRAY", items: { type: "STRING" } }
            },
            required: ["id", "familyId", "name", "description", "ingredientIds", "sideIngredientIds", "substitutionIds", "dietaryFlags", "allergenFlags", "richnessScore", "healthScore", "temperature", "format", "estimatedMinutes", "difficulty", "experienceTags"]
          }
        })
      });

      if (!response.ok) throw new Error("Gemini generation failed");
      const generated = await response.json();
      
      // Conformance validation
      const result = MealVariantSchema.safeParse({
        ...generated,
        imageAssetId: generated.imageAssetId || parentMeal.imageAssetId || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
        status: "candidate"
      });

      if (!result.success) {
        console.error("Zod Schema conformance failure:", result.error.format());
        alert("Sorry, could not apply the modification due to format validation error.");
        this.isGenerating = false;
        this.render();
        return;
      }

      const validatedMeal = result.data;

      // Deterministic allergen filter verification
      const hasViolations = this._avoidAllergens.some((allergen) => validatedMeal.allergenFlags.includes(allergen));
      if (hasViolations) {
        alert("⚠️ Allergen Safety Block: The modified recipe contains avoided allergens and cannot be generated.");
        this.isGenerating = false;
        this.render();
        return;
      }

      // Add to local catalog cache
      await cacheMealCatalog([validatedMeal]);
      this.modifiedMeal = validatedMeal;

      // Dispatch event to app root to replace the active swiping deck card dynamically
      this.dispatchEvent(new CustomEvent("recipe-modified", {
        bubbles: true,
        composed: true,
        detail: { originalMealId: this._meal!.id, newMeal: validatedMeal }
      }));

    } catch (e: any) {
      console.error(e);
      alert("Error occurred while generating modification.");
    } finally {
      this.isGenerating = false;
      this.render();
    }
  }

  render() {
    if (!this._meal) {
      this.shadowRoot!.innerHTML = "";
      return;
    }

    const currentMeal = this.modifiedMeal || this._meal;
    const { supporting, conflicting } = this.getMatchingSignals(currentMeal);

    // Format matches info
    let matchText = "";
    if (supporting.length > 0 && conflicting.length === 0) {
      matchText = `Perfect fit based on your preferences for ${supporting.map(s => s.target.entityId).join(", ")}.`;
    } else if (conflicting.length > 0) {
      matchText = `Contains ${conflicting.map(c => c.target.entityId).join(", ")}, which you marked as avoid.`;
    } else {
      matchText = "Gourmet recipe matched to your tastes.";
    }

    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .details-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #F8F5EF;
      }
      
      /* Navigation Bar */
      .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(30, 32, 30, 0.08);
      }
      .nav-bar h3 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 18px;
        font-weight: 700;
        color: #2C5E43;
      }
      .back-btn {
        background: none;
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      .back-btn:active {
        background-color: rgba(0,0,0,0.05);
      }

      /* Scroll Panel */
      .panel-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        -webkit-overflow-scrolling: touch;
      }

      /* Food Hero Image */
      .hero-container {
        width: 100%;
        aspect-ratio: 4/3;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 4px 12px rgba(30,32,30,0.06);
        background-color: #FAF7F0;
      }
      .hero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ai-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background-color: #2C5E43;
        color: #FFFFFF;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 4px 10px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }

      /* Titles */
      .title-container h2 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        color: #1E201E;
        line-height: 1.25;
      }
      .description {
        font-size: 13px;
        line-height: 1.5;
        color: #5A5D5A;
        margin-top: 6px;
      }

      /* Attributes Grid */
      .meta-row {
        display: flex;
        gap: 16px;
        padding: 12px 16px;
        background-color: #FFFFFF;
        border-radius: 14px;
        border: 1px solid rgba(30,32,30,0.06);
      }
      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        color: #5A5D5A;
      }
      .meta-icon {
        width: 16px;
        height: 16px;
        color: #2C5E43;
      }

      /* Match score explanation box */
      .explanation-box {
        display: flex;
        gap: 10px;
        padding: 14px 16px;
        background-color: ${conflicting.length > 0 ? "rgba(200, 75, 49, 0.06)" : "rgba(44, 94, 67, 0.06)"};
        border-radius: 14px;
        border: 1px solid ${conflicting.length > 0 ? "#C84B31" : "#2C5E43"};
        font-size: 12px;
        line-height: 1.45;
        color: ${conflicting.length > 0 ? "#C84B31" : "#2C5E43"};
        font-weight: 500;
      }
      .explanation-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      /* Drill Down UI */
      .modification-section {
        background-color: #FFFFFF;
        border-radius: 16px;
        padding: 16px;
        border: 1px solid rgba(30,32,30,0.06);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .section-heading {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #5A5D5A;
      }
      .presets-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .preset-btn {
        background-color: rgba(30,32,30,0.04);
        border: none;
        padding: 6px 12px;
        border-radius: 14px;
        font-family: 'Inter', sans-serif;
        font-size: 11px;
        font-weight: 500;
        color: #1E201E;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .preset-btn:active {
        background-color: rgba(30,32,30,0.08);
      }
      .input-wrapper {
        display: flex;
        gap: 8px;
      }
      .custom-input {
        flex: 1;
        background-color: #FAF9F6;
        border: 1px solid rgba(30,32,30,0.1);
        border-radius: 12px;
        padding: 10px 14px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        color: #1E201E;
        outline: none;
      }
      .custom-input:focus {
        border-color: #2C5E43;
      }
      .modify-btn {
        background-color: #2C5E43;
        border: none;
        border-radius: 12px;
        padding: 10px 18px;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .modify-btn:active {
        background-color: #204531;
      }
      .modify-btn:disabled {
        background-color: rgba(30,32,30,0.15);
        color: rgba(30,32,30,0.3);
        cursor: not-allowed;
      }
      .spinner {
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid #FFFFFF;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        animation: spin 0.8s linear infinite;
        display: inline-block;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    const imageUrl = currentMeal.imageAssetId || getFoodImage(currentMeal.id);

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      <div class="details-wrapper">
        <div class="nav-bar">
          <button class="back-btn" id="btn-back">
            <i data-lucide="arrow-left"></i>
          </button>
          <h3>Meal Details</h3>
          <div style="width:36px"></div>
        </div>

        <div class="panel-scroll">
          <!-- Food Image -->
          <div class="hero-container">
            <img class="hero-image" src="${imageUrl}" alt="${currentMeal.name}" />
            ${this.modifiedMeal ? `
              <div class="ai-badge">
                <i data-lucide="sparkles" style="width:10px;height:10px;"></i>
                AI Generated
              </div>
            ` : ""}
          </div>

          <!-- Description -->
          <div class="title-container">
            <h2>${currentMeal.name}</h2>
            <p class="description">${currentMeal.description}</p>
          </div>

          <!-- Meta Grid -->
          <div class="meta-row">
            <div class="meta-item">
              <i data-lucide="clock" class="meta-icon"></i>
              ${currentMeal.estimatedMinutes} Mins
            </div>
            <div class="meta-item">
              <i data-lucide="flame" class="meta-icon"></i>
              ${currentMeal.richnessScore > 6 ? "Rich Choice" : "Light Choice"}
            </div>
          </div>

          <!-- Match Box -->
          <div class="explanation-box">
            <i data-lucide="${conflicting.length > 0 ? "shield-alert" : "sparkles"}" class="explanation-icon"></i>
            <div>${matchText}</div>
          </div>

          <!-- Drill Down Section -->
          <div class="modification-section">
            <h4 class="section-heading">Modify this recipe</h4>
            <div class="presets-row">
              <button class="preset-btn" data-mod="Make it spicier">🔥 Make it spicier</button>
              <button class="preset-btn" data-mod="Swap potatoes for rice">🍚 Swap potatoes for rice</button>
              <button class="preset-btn" data-mod="Add a citrus kick">🍋 Add a citrus kick</button>
            </div>
            <div class="input-wrapper">
              <input class="custom-input" id="input-custom" type="text" placeholder="Type custom change..." />
              <button class="modify-btn" id="btn-modify" ${this.isGenerating ? "disabled" : ""}>
                ${this.isGenerating ? '<div class="spinner"></div>' : "Modify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook up icons
    createIcons({
      icons: { ArrowLeft, Sparkles, Clock, Flame, ShieldAlert },
      nameAttr: "data-lucide",
      root: this.shadowRoot as any
    });

    // Hook up buttons
    const backBtn = this.shadowRoot!.querySelector("#btn-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("details-close", {
          bubbles: true,
          composed: true
        }));
      });
    }

    const inputCustom = this.shadowRoot!.querySelector("#input-custom") as HTMLInputElement;
    const modifyBtn = this.shadowRoot!.querySelector("#btn-modify");

    if (modifyBtn && inputCustom) {
      modifyBtn.addEventListener("click", () => {
        const text = inputCustom.value.trim();
        if (text) {
          this.handleModifyRecipe(text);
          inputCustom.value = "";
        }
      });
    }

    const presetBtns = this.shadowRoot!.querySelectorAll(".preset-btn");
    presetBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const mod = (e.currentTarget as HTMLElement).getAttribute("data-mod")!;
        this.handleModifyRecipe(mod);
      });
    });
  }
}

customElements.define("meal-detail-view", MealDetailView);
export default MealDetailView;
