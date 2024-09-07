import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import TransformationService from "../services/transformation.service";

@customElement("input-spin-speed")
class InputSpinSpeed extends LitElement {
  render() {
    return html`<input
      type="range"
      @change=${(e) =>
        (TransformationService.rotationIncrement = e.target.value * 0.075)}
    />`;
  }
}
