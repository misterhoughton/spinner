import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

@customElement("input-line-width")
class InputLineWidth extends LitElement {
  static get properties() {
    return {
      value: { type: Number },
    };
  }
  constructor() {
    super();
    window.addEventListener("keydown", (e) => {
      if (e.code === "BracketLeft") {
        this.emit(this.value - 5);
      }
      if (e.code === "BracketRight") {
        this.emit(this.value + 5);
      }
    });
  }

  emit(lineWidth) {
    this.dispatchEvent(
      new CustomEvent("line-width-change", { detail: lineWidth })
    );
  }

  render() {
    return html`<input
      type="range"
      value=${this.value}
      @change="${(e) => this.emit(e.target.value)}"
    />`;
  }
}
