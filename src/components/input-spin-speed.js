import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import BrushService from "../services/brush.service";

@customElement("input-spin-speed")
class InputSpinSpeed extends LitElement {
  render() {
    return html`<input
      type="range"
      @change="${(e) =>
        (BrushService.rotationIncrement = e.target.value * 0.025)}"
    />`;
  }
}
