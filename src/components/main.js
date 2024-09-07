import { LitElement, html, css } from "lit-element";
import { customElement, state, property } from "lit/decorators";
import GalleryService from "../services/gallery.service";

import "./input-brush-colour";
import "./input-colour";
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
import TransformationService from "../services/transformation.service";

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
  @state({ type: Array }) galleryItems;
  @state({ type: Number }) rotationIncrement;

  constructor() {
    super();
    GalleryService.$images.subscribe((i) => {
      this.galleryItems = JSON.stringify(i);
      this.requestUpdate(); // Not sure why we need this
    });
    TransformationService.rotationIncrement.subscribe((ri) => {
      this.rotationIncrement = ri;
      this.requestUpdate(); // Not sure why we need this
    });
  }

  render() {
    return html`
      <div class="container">
        <div class="left">
          <input-colour></input-colour>
          <input-brush-pattern></input-brush-pattern>
          <!-- <input-brush-colour></input-brush-colour> -->
          <Input-line-width></Input-line-width>
          <input-line-cap></input-line-cap><input-line-join></input-line-join>
          <select-gco></select-gco>
          <input-spin-speed></input-spin-speed>
          <button-undo></button-undo>
          <button-add-to-gallery></button-add-to-gallery>
          <button-reset></button-reset>
          <spinner-gallery items=${this.galleryItems}></spinner-gallery>
        </div>
        <main>
          <rotating-canvas
            width="500"
            height="500"
            colour-bg="#fff"
            fps="120"
            rotation-increment=${this.rotationIncrement}
          ></rotating-canvas>
        </main>
      </div>
    `;
  }
}
