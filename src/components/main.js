import { LitElement, html, css } from "lit-element";
import { customElement } from "lit/decorators";
import GalleryService from "../services/gallery.service";

import "./input-brush-colour";
import "./input-line-width";
import "./input-line-cap";
import "./input-line-join";
import "./input-spin-speed";
import "./input-brush-pattern";
import "./rotating-canvas";
import "./spinner-gallery";
import "./button-undo";
import "./button-reset";
import "./button-add-to-gallery";
import "./select-gco";
import BrushService from "../services/brush.service";

@customElement("main-app")
class MainApp extends LitElement {
  static styles = css`
    .container {
      display: flex;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
    }

    .left {
      margin-right: 2em;
    }
  `;
  galleryItems = [];
  #colourFg;
  firstUpdated() {
    GalleryService.$images.subscribe((_items) => {
      this.galleryItems = JSON.stringify(_items);
      this.requestUpdate();
    });
    BrushService.lineColour.subscribe((colour) => {
      this.#colourFg = colour;
    });
  }
  render() {
    return html`
      <div class="container">
        <div class="left">
          <input-brush-colour></input-brush-colour>
          <Input-line-width></Input-line-width>
          <input-line-cap></input-line-cap><input-line-join></input-line-join>
          <input-brush-pattern></input-brush-pattern>
          <select-gco></select-gco>
          <input-spin-speed></input-spin-speed>
          <button-undo></button-undo>
          <button-add-to-gallery></button-add-to-gallery>
          <button-reset></button-reset>
          <spinner-gallery items=${this.galleryItems}></spinner-gallery>
        </div>
        <main>
          <rotating-canvas width="500" height="500" colour-bg="#fff" colour-fg=${
            this.#colourFg
          }"></rotating-canvas>
        </main>
      </div>
    `;
  }
}
