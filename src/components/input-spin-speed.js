import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

@customElement("input-spin-speed")
class InputSpinSpeed extends LitElement {
  static get properties() {
    return {
      value: { type: Number },
    };
  }
  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("spin-speed-change", { detail: e.target.value })
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
