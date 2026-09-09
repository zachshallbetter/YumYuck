import { createIcons, Check, Trash2, Award } from "lucide";
import { MealVariant, PreferenceSignal } from "../db/schema.js";
import { getFoodImage } from "../db/seedMeals.js";
import { deletePreferenceSignal } from "../db/indexedDb.js";

interface RecommendationItem {
  meal: MealVariant;
  profile: {
    displayPercentage: number;
  };
}

export class SummarySheet extends HTMLElement {
  private _recommendations: RecommendationItem[] = [];
  private _preferenceSignals: PreferenceSignal[] = [];
  private selectedMeal: MealVariant | null = null;
  private rating = 0;
  private comments = "";

  set recommendations(value: RecommendationItem[]) {
    this._recommendations = value;
    this.render();
  }

  set preferenceSignals(value: PreferenceSignal[]) {
    this._preferenceSignals = value;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private async handleRemoveSignal(signalId: string) {
    await deletePreferenceSignal(signalId);
    this.dispatchEvent(new CustomEvent("preferences-updated", {
      bubbles: true,
      composed: true
    }));
  }

  private handleSelectMeal(meal: MealVariant) {
    this.selectedMeal = meal;
    
    // Log choice event
    this.dispatchEvent(new CustomEvent("meal-selected", {
      bubbles: true,
      composed: true,
      detail: { meal }
    }));
    
    this.render();
  }

  private handleSaveFeedback() {
    if (!this.selectedMeal) return;
    
    this.dispatchEvent(new CustomEvent("outcome-recorded", {
      bubbles: true,
      composed: true,
      detail: {
        mealId: this.selectedMeal.id,
        rating: this.rating,
        comments: this.comments
      }
    }));

    alert("Feedback recorded! Enjoy your dinner.");
    this.selectedMeal = null;
    this.rating = 0;
    this.comments = "";
    
    this.dispatchEvent(new CustomEvent("session-reset", {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .summary-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #F8F5EF;
      }

      /* Header */
      .header-bar {
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid rgba(30, 32, 30, 0.08);
      }
      .header-bar h2 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        color: #2C5E43;
      }
      .header-bar p {
        font-size: 13px;
        color: #5A5D5A;
        margin-top: 4px;
      }

      /* Scroll Panel */
      .panel-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        -webkit-overflow-scrolling: touch;
      }

      .section-title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #5A5D5A;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
      }

      /* Matches Wallet-List */
      .matches-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .match-card {
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        border-radius: 16px;
        padding: 12px;
        border: 1px solid rgba(30,32,30,0.06);
        gap: 12px;
        position: relative;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .match-card:active {
        transform: scale(0.98);
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      }
      .match-img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        object-fit: cover;
      }
      .match-info {
        flex: 1;
        min-width: 0;
      }
      .match-name {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 15px;
        font-weight: 700;
        color: #1E201E;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .match-desc {
        font-size: 11px;
        color: #5A5D5A;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 2px;
      }
      .match-percent {
        font-size: 16px;
        font-weight: 700;
        color: #2C5E43;
        padding: 4px 10px;
        background-color: rgba(44,94,67,0.08);
        border-radius: 10px;
      }

      /* Preference Signals List (Reversibility) */
      .signals-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .signal-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FFFFFF;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid rgba(30,32,30,0.05);
      }
      .signal-text {
        font-size: 12px;
        font-weight: 500;
        color: #1E201E;
      }
      .signal-sentiment {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .sentiment-yum {
        background-color: rgba(44,94,67,0.08);
        color: #2C5E43;
      }
      .sentiment-nope {
        background-color: rgba(200,75,49,0.06);
        color: #C84B31;
      }
      .btn-remove {
        background: none;
        border: none;
        color: rgba(30,32,30,0.4);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        border-radius: 50%;
      }
      .btn-remove:active {
        color: #C84B31;
        background-color: rgba(200,75,49,0.06);
      }

      /* Selection and Feedback Drawer */
      .feedback-box {
        background-color: #FFFFFF;
        border-radius: 20px;
        padding: 20px;
        border: 1px solid rgba(30,32,30,0.06);
        display: flex;
        flex-direction: column;
        gap: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      }
      .selected-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .stars-row {
        display: flex;
        gap: 8px;
        justify-content: center;
      }
      .star-btn {
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        transition: transform 0.1s ease;
      }
      .star-btn:active {
        transform: scale(1.15);
      }
      .feedback-textarea {
        width: 100%;
        background-color: #FAF9F6;
        border: 1px solid rgba(30,32,30,0.1);
        border-radius: 12px;
        padding: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        outline: none;
        resize: none;
        height: 70px;
      }
      .feedback-textarea:focus {
        border-color: #2C5E43;
      }
      .save-btn {
        width: 100%;
        padding: 14px;
        background-color: #2C5E43;
        border: none;
        color: #FFFFFF;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
      }
      .save-btn:active {
        background-color: #204531;
      }
    `;

    // Filter signals to show session and persistent signals separately
    const activeSignals = this._preferenceSignals.filter(s => s.target.entityId !== "vegetarian");

    let selectionHtml = "";
    if (this.selectedMeal) {
      const imageUrl = this.selectedMeal.imageAssetId || getFoodImage(this.selectedMeal.id);
      
      const starsHtml = [1, 2, 3, 4, 5].map(val => {
        const star = val <= this.rating ? "★" : "☆";
        const color = val <= this.rating ? "#D9822B" : "#A2A5A2";
        return `<button class="star-btn" data-val="${val}" style="color:${color}">${star}</button>`;
      }).join("");

      selectionHtml = `
        <div class="feedback-box">
          <div class="selected-header">
            <img class="match-img" src="${imageUrl}" />
            <div>
              <div class="section-title" style="margin-bottom:2px">Selected Choice</div>
              <div class="match-name">${this.selectedMeal.name}</div>
            </div>
          </div>

          <div style="text-align:center;">
            <div class="section-title">Rate this dinner</div>
            <div class="stars-row">${starsHtml}</div>
          </div>

          <div>
            <div class="section-title">Feedback / Notes</div>
            <textarea class="feedback-textarea" id="txt-comments" placeholder="How did this meal turn out?">${this.comments}</textarea>
          </div>

          <button class="save-btn" id="btn-save">
            Complete Session
          </button>
        </div>
      `;
    }

    const matchesCardsHtml = this._recommendations.map(item => {
      const imageUrl = item.meal.imageAssetId || getFoodImage(item.meal.id);
      return `
        <div class="match-card" data-id="${item.meal.id}">
          <img class="match-img" src="${imageUrl}" />
          <div class="match-info">
            <div class="match-name">${item.meal.name}</div>
            <div class="match-desc">${item.meal.description}</div>
          </div>
          <div class="match-percent">${item.profile.displayPercentage}%</div>
        </div>
      `;
    }).join("");

    const signalsRowsHtml = activeSignals.map(sig => {
      return `
        <div class="signal-row">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="signal-text">${sig.target.entityId}</span>
            <span class="signal-sentiment sentiment-${sig.sentiment}">${sig.sentiment}</span>
          </div>
          <button class="btn-remove" data-sig-id="${sig.id}">
            <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
          </button>
        </div>
      `;
    }).join("");

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      <div class="summary-wrapper">
        <div class="header-bar">
          <h2>We've got it.</h2>
          <p>Here are your customized dinner matches</p>
        </div>

        <div class="panel-scroll">
          ${selectionHtml}

          <!-- Recommendations List -->
          <div>
            <h4 class="section-title">Top Discoveries</h4>
            <div class="matches-list">
              ${matchesCardsHtml}
            </div>
          </div>

          <!-- preference signals ledger -->
          ${activeSignals.length > 0 ? `
            <div>
              <h4 class="section-title">Preference History (Click Trash to Reverse)</h4>
              <div class="signals-list">
                ${signalsRowsHtml}
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;

    // Hook up Lucide icons
    createIcons({
      icons: { Check, Trash2, Award },
      nameAttr: "data-lucide",
      root: this.shadowRoot as any
    });

    // Hook up stars rating click events
    const starBtns = this.shadowRoot!.querySelectorAll(".star-btn");
    starBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.rating = parseInt((e.currentTarget as HTMLElement).getAttribute("data-val")!, 10);
        this.render();
      });
    });

    // Hook up comment input binding
    const commentsInput = this.shadowRoot!.querySelector("#txt-comments") as HTMLTextAreaElement;
    if (commentsInput) {
      commentsInput.addEventListener("input", () => {
        this.comments = commentsInput.value;
      });
    }

    // Save feedback event
    const saveBtn = this.shadowRoot!.querySelector("#btn-save");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        this.handleSaveFeedback();
      });
    }

    // Remove signal handler
    const removeBtns = this.shadowRoot!.querySelectorAll(".btn-remove");
    removeBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-sig-id")!;
        this.handleRemoveSignal(id);
      });
    });

    // Match card selection handler
    const matchCards = this.shadowRoot!.querySelectorAll(".match-card");
    matchCards.forEach(card => {
      card.addEventListener("click", (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute("data-id")!;
        const meal = this._recommendations.find(r => r.meal.id === id)!.meal;
        this.handleSelectMeal(meal);
      });
    });
  }
}

customElements.define("summary-sheet", SummarySheet);
export default SummarySheet;
