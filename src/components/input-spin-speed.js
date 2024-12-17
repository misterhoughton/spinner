import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import { property } from "lit/decorators.js";

@customElement("input-spin-speed")
class InputSpinSpeed extends LitElement {
  @property({ type: Number }) value;
  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("spin-speed-change", { detail: e.target.value * 0.075 })
    );
  }

  render() {
    return html`<input
      type="range"
      value=${this.value}
      @change=${this.onChange}
    />`;
  }
}
