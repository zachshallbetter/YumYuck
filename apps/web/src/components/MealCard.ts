import { MealVariant } from "../db/schema.js";
import { getFoodImage } from "../db/seedMeals.js";

export class MealCard extends HTMLElement {
  private _meal: MealVariant | null = null;
  private _active = false;
  private isDragging = false;
  private isLifted = false;
  private isPressed = false;
  
  // Pointer tracking vars
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  private liftTimeout: any = null;
  private lastTap = 0;

  set meal(value: MealVariant | null) {
    this._meal = value;
    this.render();
  }

  get meal() {
    return this._meal;
  }

  set active(value: boolean) {
    this._active = value;
    this.updateActiveState();
  }

  get active() {
    return this._active;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Bind gesture events
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListener("pointerdown", this.onPointerDown);
  }

  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.onPointerDown);
    this.cleanupWindowListeners();
  }

  private updateActiveState() {
    const container = this.shadowRoot?.querySelector(".card-container");
    if (container) {
      if (this._active) {
        container.classList.remove("inactive");
        container.classList.add("active");
      } else {
        container.classList.remove("active");
        container.classList.add("inactive");
      }
    }
  }

  private onPointerDown(e: PointerEvent) {
    if (!this._active) return;
    this.isPressed = true;
    this.isDragging = false;
    
    // Handle double tap
    const now = Date.now();
    if (now - this.lastTap < 300) {
      this.handleDoubleTap();
      this.lastTap = 0;
      return;
    }
    this.lastTap = now;

    // Track click on Info Area specifically to avoid dragging swipe
    const path = e.composedPath();
    const isInfoArea = path.some((el: any) => el.classList && el.classList.contains("info-area"));
    if (isInfoArea) {
      return; // let click pass through to detail click
    }

    this.startX = e.clientX;
    this.startY = e.clientY;
    this.currentX = 0;
    this.currentY = 0;

    const container = this.shadowRoot?.querySelector(".card-container") as HTMLElement;
    if (container) {
      container.classList.remove("snapping");
      container.style.transform = `scale(0.99)`;
    }

    // Set Lift Timeout (300ms hold gesture)
    this.clearLiftTimeout();
    this.liftTimeout = setTimeout(() => {
      this.triggerLift();
    }, 300);

    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointercancel", this.onPointerUp);
  }

  private onPointerMove(e: PointerEvent) {
    if (!this.isPressed) return;
    
    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;

    // If movement is larger than threshold, cancel hold Lift timer
    if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
      this.clearLiftTimeout();
      this.isDragging = true;
    }

    this.currentX = deltaX;
    this.currentY = deltaY;

    // Rotation calculation
    const rotation = deltaX * 0.05; // moves with displacement
    
    const container = this.shadowRoot?.querySelector(".card-container") as HTMLElement;
    if (container) {
      container.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotation}deg) scale(${this.isLifted ? 1.02 : 0.99})`;
    }

    // Dispatch drag position to stack for card 2/3 anticipation scaling
    this.dispatchEvent(new CustomEvent("card-drag", {
      bubbles: true,
      composed: true,
      detail: { x: deltaX, y: deltaY }
    }));

    // Update overlay tints and stamps opacities
    this.updateFeedback(deltaX, deltaY);
  }

  private onPointerUp(e: PointerEvent) {
    this.isPressed = false;
    this.clearLiftTimeout();
    this.cleanupWindowListeners();

    const threshold = 120;
    const container = this.shadowRoot?.querySelector(".card-container") as HTMLElement;

    if (!container) return;

    // Check if swipe committed
    if (this.isDragging && (Math.abs(this.currentX) > threshold || this.currentY < -threshold)) {
      let response: "yum" | "nope" | "maybe" = "maybe";
      let exitX = 0;
      let exitY = 0;

      if (this.currentY < -threshold && Math.abs(this.currentX) < threshold) {
        response = "maybe";
        exitY = -800;
      } else if (this.currentX > threshold) {
        response = "yum";
        exitX = 800;
      } else {
        response = "nope";
        exitX = -800;
      }

      this.animateExit(container, exitX, exitY, response);
    } else {
      // Snaps back
      this.isLifted = false;
      container.classList.add("snapping");
      container.style.transform = `translate3d(0px, 0px, 0) rotate(0deg) scale(1.0)`;
      this.resetFeedback(container);
      
      this.dispatchEvent(new CustomEvent("card-release", {
        bubbles: true,
        composed: true
      }));
    }
  }

  private triggerLift() {
    this.isLifted = true;
    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
    const container = this.shadowRoot?.querySelector(".card-container") as HTMLElement;
    if (container) {
      container.classList.add("lifted");
      container.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0) scale(1.02)`;
    }
    this.dispatchEvent(new CustomEvent("card-lift", {
      bubbles: true,
      composed: true
    }));
  }

  private handleDoubleTap() {
    if (navigator.vibrate) {
      navigator.vibrate([10, 30]);
    }
    
    // Animate large heart popup
    const heart = this.shadowRoot?.querySelector(".double-tap-heart") as HTMLElement;
    if (heart) {
      heart.classList.remove("animate-heart");
      // trigger reflow
      void heart.offsetWidth;
      heart.classList.add("animate-heart");
    }

    this.dispatchEvent(new CustomEvent("card-favorite", {
      bubbles: true,
      composed: true,
      detail: { meal: this._meal }
    }));
  }

  private clearLiftTimeout() {
    if (this.liftTimeout) {
      clearTimeout(this.liftTimeout);
      this.liftTimeout = null;
    }
  }

  private cleanupWindowListeners() {
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.onPointerUp);
  }

  private updateFeedback(x: number, y: number) {
    const container = this.shadowRoot?.querySelector(".card-container") as HTMLElement;
    if (!container) return;

    const nopeOverlay = container.querySelector(".overlay-nope") as HTMLElement;
    const yumOverlay = container.querySelector(".overlay-yum") as HTMLElement;
    const maybeOverlay = container.querySelector(".overlay-maybe") as HTMLElement;

    const stampNope = container.querySelector(".stamp-nope") as HTMLElement;
    const stampYum = container.querySelector(".stamp-yum") as HTMLElement;
    const stampMaybe = container.querySelector(".stamp-maybe") as HTMLElement;

    const maxThreshold = 150;
    
    // Reset opacities
    if (nopeOverlay) nopeOverlay.style.opacity = "0";
    if (yumOverlay) yumOverlay.style.opacity = "0";
    if (maybeOverlay) maybeOverlay.style.opacity = "0";
    if (stampNope) { stampNope.style.opacity = "0"; stampNope.style.transform = "scale(0.8) rotate(-15deg)"; }
    if (stampYum) { stampYum.style.opacity = "0"; stampYum.style.transform = "scale(0.8) rotate(15deg)"; }
    if (stampMaybe) { stampMaybe.style.opacity = "0"; stampMaybe.style.transform = "scale(0.8) rotate(0deg)"; }

    // Swipe Up: Maybe
    if (y < 0 && Math.abs(x) < Math.abs(y)) {
      const opacity = Math.min(Math.abs(y) / maxThreshold, 0.7).toString();
      if (maybeOverlay) maybeOverlay.style.opacity = opacity;
      if (stampMaybe) {
        stampMaybe.style.opacity = Math.min(Math.abs(y) / maxThreshold, 1).toString();
        stampMaybe.style.transform = `scale(${0.8 + 0.2 * Math.min(Math.abs(y) / maxThreshold, 1)}) rotate(0deg)`;
      }
    } 
    // Swipe Right: Yum
    else if (x > 0) {
      const opacity = Math.min(x / maxThreshold, 0.7).toString();
      if (yumOverlay) yumOverlay.style.opacity = opacity;
      if (stampYum) {
        stampYum.style.opacity = Math.min(x / maxThreshold, 1).toString();
        stampYum.style.transform = `scale(${0.8 + 0.2 * Math.min(x / maxThreshold, 1)}) rotate(${15 - 5 * Math.min(x / maxThreshold, 1)}deg)`;
      }
    } 
    // Swipe Left: Nope
    else if (x < 0) {
      const opacity = Math.min(Math.abs(x) / maxThreshold, 0.7).toString();
      if (nopeOverlay) nopeOverlay.style.opacity = opacity;
      if (stampNope) {
        stampNope.style.opacity = Math.min(Math.abs(x) / maxThreshold, 1).toString();
        stampNope.style.transform = `scale(${0.8 + 0.2 * Math.min(Math.abs(x) / maxThreshold, 1)}) rotate(${-15 + 5 * Math.min(x / maxThreshold, 1)}deg)`;
      }
    }
  }

  private resetFeedback(container: HTMLElement) {
    const nopeOverlay = container.querySelector(".overlay-nope") as HTMLElement;
    const yumOverlay = container.querySelector(".overlay-yum") as HTMLElement;
    const maybeOverlay = container.querySelector(".overlay-maybe") as HTMLElement;

    const stampNope = container.querySelector(".stamp-nope") as HTMLElement;
    const stampYum = container.querySelector(".stamp-yum") as HTMLElement;
    const stampMaybe = container.querySelector(".stamp-maybe") as HTMLElement;

    if (nopeOverlay) nopeOverlay.style.opacity = "0";
    if (yumOverlay) yumOverlay.style.opacity = "0";
    if (maybeOverlay) maybeOverlay.style.opacity = "0";
    if (stampNope) { stampNope.style.opacity = "0"; stampNope.style.transform = "scale(0.8) rotate(-15deg)"; }
    if (stampYum) { stampYum.style.opacity = "0"; stampYum.style.transform = "scale(0.8) rotate(15deg)"; }
    if (stampMaybe) { stampMaybe.style.opacity = "0"; stampMaybe.style.transform = "scale(0.8) rotate(0deg)"; }
    
    container.classList.remove("lifted");
  }

  private animateExit(container: HTMLElement, x: number, y: number, response: "yum" | "nope" | "maybe") {
    container.style.transition = "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease";
    container.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${x * 0.05}deg) scale(0.9)`;
    container.style.opacity = "0";

    setTimeout(() => {
      this.dispatchEvent(new CustomEvent("swipe", {
        bubbles: true,
        composed: true,
        detail: { meal: this._meal, response }
      }));
    }, 250);
  }

  render() {
    if (!this._meal) {
      this.shadowRoot!.innerHTML = "";
      return;
    }

    const tagsHtml = this._meal.experienceTags
      .map(tag => `<span class="tag-chip">${tag}</span>`)
      .join('<span class="tag-dot">•</span>');

    const style = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
      }
      .card-container {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        border-radius: 32px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 12px 32px -8px rgba(30, 32, 30, 0.08), 0 4px 12px -2px rgba(30, 32, 30, 0.04);
        transform-origin: center bottom;
      }
      .card-container.lifted {
        box-shadow: 0 32px 64px -16px rgba(30,32,30,0.14), 0 12px 28px -4px rgba(30,32,30,0.08);
      }
      .card-container.inactive {
        pointer-events: none;
        opacity: 0.45;
      }
      .card-container.snapping {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25);
      }

      /* Editorial Image */
      .food-image {
        width: 100%;
        height: 100%;
        object-cover: cover;
        pointer-events: none;
        object-fit: cover;
        transition: filter 0.3s ease;
      }
      
      /* Color Overlays (Multiply blend) */
      .overlay {
        position: absolute;
        inset: 0;
        mix-blend-mode: multiply;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
      }
      .overlay-nope { background-color: #FAF2F0; }
      .overlay-yum { background-color: #EFF6F2; }
      .overlay-maybe { background-color: #FFF9E6; }

      /* Visual stamps */
      .stamp {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        font-family: var(--font-sans);
        font-size: 32px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 10px 24px;
        border-radius: 12px;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: opacity 0.1s ease, transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.2);
      }
      .stamp-nope {
        color: #C84B31;
        border: 4px solid #C84B31;
        transform: translate(-50%, -50%) rotate(-15deg);
      }
      .stamp-yum {
        color: #2C5E43;
        border: 4px solid #2C5E43;
        transform: translate(-50%, -50%) rotate(15deg);
      }
      .stamp-maybe {
        color: #D9822B;
        border: 4px solid #D9822B;
        transform: translate(-50%, -50%) rotate(0deg);
      }

      /* Double tap heart pop */
      .double-tap-heart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 80px;
        color: rgba(44, 94, 67, 0.9);
        pointer-events: none;
        z-index: 15;
      }
      .animate-heart {
        animation: heartPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25) forwards;
      }
      @keyframes heartPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        25% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      }

      /* Gradient vignette overlay */
      .vignette {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%);
        pointer-events: none;
      }

      /* Text Meta Overlay */
      .info-area {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        color: #F8F5EF;
        cursor: pointer;
      }
      .meal-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.4);
      }
      .tags-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: rgba(248, 245, 239, 0.85);
        text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      }
      .tag-chip {
        background-color: rgba(255,255,255,0.12);
        padding: 2px 8px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
      }
      .tag-dot {
        opacity: 0.5;
        font-size: 8px;
      }
    `;

    const imageUrl = this._meal.imageAssetId || getFoodImage(this._meal.id);

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      <div class="card-container ${this._active ? "active" : "inactive"}">
        <img class="food-image" src="${imageUrl}" alt="${this._meal.name}" />
        <div class="vignette"></div>
        
        <!-- Overlays -->
        <div class="overlay overlay-nope"></div>
        <div class="overlay overlay-yum"></div>
        <div class="overlay overlay-maybe"></div>
        
        <!-- Stamps -->
        <div class="stamp stamp-nope">Nope</div>
        <div class="stamp stamp-yum">Yum</div>
        <div class="stamp stamp-maybe">Maybe</div>
        
        <!-- Double Tap Heart -->
        <div class="double-tap-heart">💚</div>

        <!-- Meta Area -->
        <div class="info-area">
          <h2 class="meal-title">${this._meal.name}</h2>
          <div class="tags-row">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;

    // Dispatch details overlay click event on bottom info area
    const info = this.shadowRoot!.querySelector(".info-area");
    if (info) {
      info.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("card-click", {
          bubbles: true,
          composed: true,
          detail: { meal: this._meal }
        }));
      });
    }

    this.updateActiveState();
  }
}

customElements.define("meal-card", MealCard);
