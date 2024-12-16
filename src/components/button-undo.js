import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import UndoService from "../services/undo.service";

@customElement("button-undo")
class ButtonUndo extends LitElement {
  onClick() {
    this.dispatchEvent(new CustomEvent("undo"));
  }
  render() {
    return html`<button @click=${this.onClick}>undo</button>`;
  }
}
