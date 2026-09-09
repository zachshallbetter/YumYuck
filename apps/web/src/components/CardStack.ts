import { MealVariant } from "../db/schema.js";
import { MealCard } from "./MealCard.js";

export class CardStack extends HTMLElement {
  private _meals: MealVariant[] = [];
  private cards: MealCard[] = [];

  set meals(value: MealVariant[]) {
    this._meals = value;
    this.render();
  }

  get meals() {
    return this._meals;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.handleCardDrag = this.handleCardDrag.bind(this);
    this.handleCardRelease = this.handleCardRelease.bind(this);
  }

  connectedCallback() {
    this.addEventListener("card-drag", this.handleCardDrag as EventListener);
    this.addEventListener("card-release", this.handleCardRelease as EventListener);
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener("card-drag", this.handleCardDrag as EventListener);
    this.removeEventListener("card-release", this.handleCardRelease as EventListener);
  }

  private handleCardDrag(e: CustomEvent) {
    const { x, y } = e.detail;
    const dragDistance = Math.min(Math.sqrt(x * x + y * y), 150);
    const progress = dragDistance / 150; // 0 to 1

    const card2 = this.cards[1]?.shadowRoot?.querySelector(".card-container") as HTMLElement;
    const card3 = this.cards[2]?.shadowRoot?.querySelector(".card-container") as HTMLElement;

    if (card2) {
      const scale = 0.97 + 0.03 * progress;
      const yPos = 10 - 10 * progress;
      card2.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale})`;
      card2.style.transition = "none";
    }

    if (card3) {
      const scale = 0.94 + 0.03 * progress;
      const yPos = 20 - 10 * progress;
      card3.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale})`;
      card3.style.transition = "none";
    }
  }

  private handleCardRelease() {
    const card2 = this.cards[1]?.shadowRoot?.querySelector(".card-container") as HTMLElement;
    const card3 = this.cards[2]?.shadowRoot?.querySelector(".card-container") as HTMLElement;

    if (card2) {
      card2.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25)";
      card2.style.transform = `translate3d(0, 10px, 0) scale(0.97)`;
    }

    if (card3) {
      card3.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25)";
      card3.style.transform = `translate3d(0, 20px, 0) scale(0.94)`;
    }
  }

  render() {
    const container = this.shadowRoot!.querySelector(".stack-container");
    
    // Clear old card elements
    this.cards = [];
    
    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }
      .stack-container {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .stack-card {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .stack-card:nth-child(1) {
        z-index: 10;
      }
      .stack-card:nth-child(2) {
        z-index: 9;
      }
      .stack-card:nth-child(3) {
        z-index: 8;
      }
    `;

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      <div class="stack-container"></div>
    `;

    const stackContainer = this.shadowRoot!.querySelector(".stack-container")!;

    // Instantiates top 3 cards in the deck
    const visibleCount = Math.min(this._meals.length, 3);
    for (let i = 0; i < visibleCount; i++) {
      const card = document.createElement("meal-card") as MealCard;
      card.className = "stack-card";
      card.meal = this._meals[i];
      card.active = (i === 0);
      
      stackContainer.appendChild(card);
      this.cards.push(card);

      // Resting styles for cards below the top card
      const innerContainer = card.shadowRoot?.querySelector(".card-container") as HTMLElement;
      if (innerContainer) {
        if (i === 1) {
          innerContainer.style.transform = "translate3d(0, 10px, 0) scale(0.97)";
        } else if (i === 2) {
          innerContainer.style.transform = "translate3d(0, 20px, 0) scale(0.94)";
        }
      }
    }

    if (this._meals.length === 0) {
      stackContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 16px; font-weight: 500; font-family: var(--font-sans);">
          <div style="font-size: 40px; margin-bottom: 12px;">🍽</div>
          Let's find more.
        </div>
      `;
    }
  }
}

customElements.define("card-stack", CardStack);
export default CardStack;
