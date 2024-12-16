import { LitElement, html, css } from "lit-element";
import { customElement } from "lit/decorators";
import BackgroundService from "../services/background.service";

@customElement("gallery-item")
class GalleryItem extends LitElement {
  static get styles() {
    return css`
      .gallery-item {
        position: relative;
      }
      .btn-delete {
        position: absolute;
        top: 0;
        right: 0;
      }
      img {
        width: 100%;
        background-color: aliceblue;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          outline: 10px solid #fff;
        }
      }
    `;
  }
  static get properties() {
    return {
      src: {},
    };
  }

  onClick() {
    this.dispatchEvent(
      new CustomEvent("item-select", {
        detail: this.src,
      })
    );
  }

  render() {
    return html`<div class="gallery-item">
      <button class="btn-delete" @click="${this.remove}">Delete</button
      ><img @click="${this.onClick}" src=${this.src} />
    </div>`;
  }
}
