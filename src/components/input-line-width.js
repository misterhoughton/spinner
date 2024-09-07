import { LitElement, html } from "lit-element";
import { customElement, property } from "lit/decorators";
import BrushService from "../services/brush.service";

@customElement("input-line-width")
class InputLineWidth extends LitElement {
  @property({ type: Number }) value;
  constructor() {
    super();
    window.addEventListener("keydown", (_e) => {
      if (_e.code === "BracketLeft") {
        BrushService.lineWidth = this.value - 5;
      }
      if (_e.code === "BracketRight") {
        BrushService.lineWidth = this.value + 5;
      }
    });
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
      @change="${(e) => (BrushService.lineWidth = e.target.value)}"
    />`;
  }
}
