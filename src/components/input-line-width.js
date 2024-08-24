import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import BrushService from "../services/brush.service";

@customElement("input-line-width")
class InputLineWidth extends LitElement {
  render() {
    return html`<input
      type="range"
      @change="${(e) => (BrushService.lineWidth = e.target.value)}"
    />`;
  }
}
