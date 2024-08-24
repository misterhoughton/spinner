import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import GalleryService from "../services/gallery.service";
import UndoService from "../services/undo.service";

@customElement("button-add-to-gallery")
class ButtonAddToGallery extends LitElement {
  render() {
    return html`<button
      @click="${() => GalleryService.addImage(UndoService.thumbnail)}"
    >
      add to gallery
    </button>`;
  }
}
