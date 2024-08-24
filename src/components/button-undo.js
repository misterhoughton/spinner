import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import UndoService from "../services/undo.service";

@customElement("button-undo")
class ButtonUndo extends LitElement {
  render() {
    return html`<button @click="${() => UndoService.undo()}">undo</button>`;
  }
}
