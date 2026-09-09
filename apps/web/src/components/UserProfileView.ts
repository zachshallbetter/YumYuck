import { createIcons, X, RotateCcw } from "lucide";
import { PreferenceSignal } from "../db/schema.js";
import { savePreferenceSignal, deletePreferenceSignal } from "../db/indexedDb.js";

interface PreferenceConfig {
  id: string;
  label: string;
  type: "protein" | "format" | "flavor" | "dietary";
  icon?: string;
}

const DIETARY_OPTIONS: PreferenceConfig[] = [
  { id: "vegetarian", label: "Vegetarian", type: "dietary", icon: "🌱" },
  { id: "vegan", label: "Vegan", type: "dietary", icon: "🟢" },
  { id: "gluten_free", label: "Gluten-Free", type: "dietary", icon: "🌾" },
  { id: "dairy_free", label: "Dairy-Free", type: "dietary", icon: "🥛" },
  { id: "soy_free", label: "Soy-Free", type: "dietary", icon: "🫘" },
  { id: "nut_free", label: "Nut-Free", type: "dietary", icon: "🥜" },
];

const PROTEIN_OPTIONS: PreferenceConfig[] = [
  { id: "seafood", label: "Seafood", type: "protein", icon: "🐟" },
  { id: "poultry", label: "Poultry", type: "protein", icon: "🍗" },
  { id: "red_meat", label: "Red Meat", type: "protein", icon: "🥩" },
  { id: "pork", label: "Pork", type: "protein", icon: "🥓" },
  { id: "shellfish", label: "Shellfish", type: "protein", icon: "🍤" },
  { id: "vegetarian_protein", label: "Vegetarian Protein", type: "protein", icon: "🥚" },
  { id: "plant_based", label: "Plant-Based", type: "protein", icon: "🌿" },
];

const FORMAT_OPTIONS: PreferenceConfig[] = [
  { id: "plate", label: "Plated", type: "format", icon: "🍽" },
  { id: "bowl", label: "Bowl", type: "format", icon: "🥣" },
  { id: "handheld", label: "Handheld", type: "format", icon: "🌮" },
  { id: "pasta", label: "Pasta", type: "format", icon: "🍝" },
  { id: "sushi", label: "Sushi", type: "format", icon: "🍣" },
  { id: "skewers", label: "Skewers", type: "format", icon: "🍢" },
  { id: "soup", label: "Soup", type: "format", icon: "🍲" },
];

const FLAVOR_OPTIONS: PreferenceConfig[] = [
  { id: "light", label: "Fresh & Light", type: "flavor", icon: "🍋" },
  { id: "garlic", label: "Garlic & Herb", type: "flavor", icon: "🧄" },
  { id: "savory", label: "Savory & Earthy", type: "flavor", icon: "🍄" },
  { id: "buttery", label: "Rich & Buttery", type: "flavor", icon: "🧈" },
  { id: "spicy", label: "Spicy", type: "flavor", icon: "🌶" },
  { id: "citrus", label: "Citrus", type: "flavor", icon: "🍊" },
  { id: "umami", label: "Umami", type: "flavor", icon: "🥢" },
];

export class UserProfileView extends HTMLElement {
  private _preferenceSignals: PreferenceSignal[] = [];

  set preferenceSignals(value: PreferenceSignal[]) {
    this._preferenceSignals = value;
    this.render();
  }

  get preferenceSignals() {
    return this._preferenceSignals;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private getSignalState(id: string): "yum" | "nope" | "neutral" {
    const persistentSignals = this._preferenceSignals.filter(s => s.scope === "persistent");
    const signal = persistentSignals.find((s) => s.target.entityId === id);
    if (!signal) return "neutral";
    return signal.sentiment === "yum" ? "yum" : "nope";
  }

  private async handleChipClick(option: PreferenceConfig) {
    const currentState = this.getSignalState(option.id);
    const persistentSignals = this._preferenceSignals.filter(s => s.scope === "persistent");
    const existingSignal = persistentSignals.find((s) => s.target.entityId === option.id);

    if (currentState === "neutral") {
      // Transition to Yum
      const signal: PreferenceSignal = {
        id: `sig-persistent-${option.id}-${Math.random().toString(36).substr(2, 5)}`,
        userId: "partner-user",
        target: {
          entityType: option.type,
          entityId: option.id,
        },
        sentiment: "yum",
        strength: 1.0,
        scope: "persistent",
        source: "explicit-profile",
        confidence: 1.0,
        createdAt: new Date().toISOString(),
        evidenceIds: [],
        reversible: true,
      };
      await savePreferenceSignal(signal);
    } else if (currentState === "yum") {
      // Transition to Nope
      if (existingSignal) {
        await deletePreferenceSignal(existingSignal.id);
      }
      const signal: PreferenceSignal = {
        id: `sig-persistent-${option.id}-${Math.random().toString(36).substr(2, 5)}`,
        userId: "partner-user",
        target: {
          entityType: option.type,
          entityId: option.id,
        },
        sentiment: "nope",
        strength: 1.0,
        scope: "persistent",
        source: "explicit-profile",
        confidence: 1.0,
        createdAt: new Date().toISOString(),
        evidenceIds: [],
        reversible: true,
      };
      await savePreferenceSignal(signal);
    } else {
      // Transition back to Neutral
      if (existingSignal) {
        await deletePreferenceSignal(existingSignal.id);
      }
    }

    this.dispatchEvent(new CustomEvent("preferences-updated", {
      bubbles: true,
      composed: true
    }));
  }

  private renderChipsSection(title: string, options: PreferenceConfig[]) {
    const chipsHtml = options.map(option => {
      const state = this.getSignalState(option.id);
      let stateClass = "neutral";
      let statusIcon = "";

      if (state === "yum") {
        stateClass = "yum";
        statusIcon = "💚";
      } else if (state === "nope") {
        stateClass = "nope";
        statusIcon = "🚫";
      }

      return `
        <button class="chip ${stateClass}" data-id="${option.id}">
          <span class="chip-emoji">${option.icon || ""}</span>
          <span class="chip-label">${option.label}</span>
          ${statusIcon ? `<span class="chip-status">${statusIcon}</span>` : ""}
        </button>
      `;
    }).join("");

    return `
      <div class="section-container">
        <h4 class="section-title">${title}</h4>
        <div class="chips-grid">
          ${chipsHtml}
        </div>
      </div>
    `;
  }

  render() {
    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .profile-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #F8F5EF;
      }
      
      /* Header */
      .header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(30, 32, 30, 0.08);
      }
      .header-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 20px;
        font-weight: 700;
        color: #2C5E43;
      }
      .close-button {
        background: none;
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        color: #1E201E;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .close-button:active {
        background-color: rgba(0,0,0,0.05);
      }

      /* Content Scroll Area */
      .content-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        -webkit-overflow-scrolling: touch;
      }

      .section-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .section-title {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #5A5D5A;
      }
      .chips-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      /* Toggle Chips styling */
      .chip {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 20px;
        border: 1px solid rgba(30, 32, 30, 0.1);
        background-color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #1E201E;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .chip:active {
        transform: scale(0.96);
      }
      .chip.neutral {
        border-color: rgba(30, 32, 30, 0.1);
      }
      .chip.yum {
        background-color: rgba(44, 94, 67, 0.08);
        border-color: #2C5E43;
        color: #2C5E43;
        font-weight: 600;
      }
      .chip.nope {
        background-color: rgba(200, 75, 49, 0.06);
        border-color: #C84B31;
        color: #C84B31;
        font-weight: 600;
      }
      .chip-emoji {
        font-size: 14px;
      }
      .chip-status {
        margin-left: 2px;
        font-size: 11px;
      }

      /* Footer / Actions */
      .footer-actions {
        padding: 16px 20px;
        border-top: 1px solid rgba(30, 32, 30, 0.08);
        display: flex;
        flex-direction: column;
        gap: 12px;
        background-color: #FFFFFF;
      }
      .regen-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 14px;
        border-radius: 14px;
        border: none;
        background-color: #2C5E43;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .regen-button:active {
        transform: scale(0.98);
        background-color: #204531;
      }
      .regen-icon {
        width: 16px;
        height: 16px;
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      <div class="profile-wrapper">
        <div class="header-bar">
          <h3 class="header-title">Personal Settings</h3>
          <button class="close-button" id="btn-close">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div class="content-scroll">
          <div style="background-color: #FFFFFF; border-radius: 16px; padding: 16px; border: 1px dashed rgba(44, 94, 67, 0.2); font-size: 12px; line-height: 1.5; color: #5A5D5A;">
            💡 Tap chips to cycle between <strong style="color:#2C5E43">Preferred 💚</strong>, <strong style="color:#C84B31">Avoided 🚫</strong>, and <strong>Neutral</strong> states. Avoided dietary flags will never be generated.
          </div>

          ${this.renderChipsSection("Dietary Filters", DIETARY_OPTIONS)}
          ${this.renderChipsSection("Proteins", PROTEIN_OPTIONS)}
          ${this.renderChipsSection("Formats", FORMAT_OPTIONS)}
          ${this.renderChipsSection("Flavors", FLAVOR_OPTIONS)}
        </div>

        <div class="footer-actions">
          <button class="regen-button" id="btn-regen">
            <i data-lucide="rotate-ccw" class="regen-icon"></i>
            Regenerate Meal Catalog
          </button>
        </div>
      </div>
    `;

    // Hook up Lucide icons
    createIcons({
      icons: { X, RotateCcw },
      nameAttr: "data-lucide",
      root: this.shadowRoot as any
    });

    // Close button event
    const closeBtn = this.shadowRoot!.querySelector("#btn-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("profile-close", {
          bubbles: true,
          composed: true
        }));
      });
    }

    // Regen button event
    const regenBtn = this.shadowRoot!.querySelector("#btn-regen");
    if (regenBtn) {
      regenBtn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("regenerate-catalog", {
          bubbles: true,
          composed: true
        }));
      });
    }

    // Chip click handlers
    const chips = this.shadowRoot!.querySelectorAll(".chip");
    chips.forEach(chip => {
      chip.addEventListener("click", async (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
        const option = [
          ...DIETARY_OPTIONS,
          ...PROTEIN_OPTIONS,
          ...FORMAT_OPTIONS,
          ...FLAVOR_OPTIONS
        ].find(o => o.id === id)!;

        await this.handleChipClick(option);
      });
    });
  }
}

customElements.define("user-profile-view", UserProfileView);
export default UserProfileView;
