import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

@customElement("button-add-to-gallery")
class ButtonAddToGallery extends LitElement {
  onClick(e) {
    this.dispatchEvent(new CustomEvent("add-to-gallery"));
  }
  render() {
    return html`<button @click="${this.onClick}">add to gallery</button>`;
  }
}
