import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import TransformationService from "../services/transformation.service";

@customElement("input-spin-speed")
class InputSpinSpeed extends LitElement {
  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("spin-speed-change", { detail: e.target.value * 0.075 })
    );
  }
  render() {
    return html`<input type="range" @change=${this.onChange} />`;
  }
}
