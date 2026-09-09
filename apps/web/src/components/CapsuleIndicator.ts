class CapsuleIndicator extends HTMLElement {
  static get observedAttributes() {
    return ["current", "total"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const current = parseInt(this.getAttribute("current") || "0", 10);
    const total = parseInt(this.getAttribute("total") || "8", 10);

    const style = `
      :host {
        display: flex;
        gap: 6px;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 180px;
      }
      .capsule {
        flex: 1;
        height: 6px;
        border-radius: 9999px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .capsule.filled {
        background-color: #2C5E43; /* primary-green */
        transform: scaleY(1.1);
      }
      .capsule.empty {
        background-color: rgba(30, 32, 30, 0.1);
      }
    `;

    let html = "";
    for (let i = 0; i < total; i++) {
      const isFilled = i < current;
      html += `<div class="capsule ${isFilled ? "filled" : "empty"}"></div>`;
    }

    this.shadowRoot!.innerHTML = `
      <style>${style}</style>
      ${html}
    `;
  }
}

customElements.define("capsule-indicator", CapsuleIndicator);
export default CapsuleIndicator;
