import { LitElement, html } from "lit-element";
import { customElement, property } from "lit/decorators";
import BrushService from "../services/brush.service";

@customElement("input-line-width")
class InputLineWidth extends LitElement {
  @property({ type: Number }) value;
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

  connectedCallback() {
    super.connectedCallback();
    BrushService.lineWidth.subscribe((lineWidth) => {
      this.value = lineWidth;
      this.requestUpdate();
    });
  }

  render() {
    return html`<input
      type="range"
      value=${this.value}
      @change="${(e) => this.emit(e.target.value)}"
    />`;
  }
}
