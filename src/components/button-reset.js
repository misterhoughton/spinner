import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

@customElement("button-reset")
class ButtonReset extends LitElement {
  onClick() {
    this.dispatchEvent(new CustomEvent("reset"));
  }
  render() {
    return html`<button @click="${this.onClick}">Reset</button>`;
  }
}
