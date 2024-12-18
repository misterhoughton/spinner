import { LitElement, html, css } from "lit-element";
import { customElement } from "lit/decorators";
import GalleryService from "../services/gallery.service";
import BrushService from "../services/brush.service";
import BackgroundService from "../services/background.service";
import UndoService from "../services/undo.service";

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

  static get properties() {
    return {
      galleryItems: { type: Array },
      rotationIncrement: { type: Number },
      lineWidth: { type: Number },
      brushColour: {},
      brushPattern: {},
      thumbnail: {},
    };
  }

  constructor() {
    super();
    GalleryService.$images.subscribe((i) => {
      this.galleryItems = JSON.stringify(i);
    });
  }

  onColourChange(e) {
    this.brushColour = e.detail;
    BrushService.lineColour = e.detail;
  }

  onPatternChange(e) {
    this.brushPattern = e.detail;
    BrushService.brushPattern = e.detail;
  }

  onSpinSpeedChange(e) {
    this.rotationIncrement = e.detail;
  }

  onLineWidthChange(e) {
    BrushService.lineWidth = e.detail;
    this.lineWidth = e.detail;
  }

  onLineCapChange(e) {
    BrushService.lineCap = e.detail;
  }

  onLineJoinChange(e) {
    BrushService.lineJoin = e.detail;
  }

  onGcoChange(e) {
    BrushService.blendingMode = e.detail;
  }

  onUndoClick() {
    UndoService.undo();
  }

  onAddToGallery() {
    GalleryService.addImage(this.thumbnail);
  }

  onReset() {
    BackgroundService.reset();
  }

  onGalleryItemSelect(e) {
    BackgroundService.setBackgroundImage(e.detail);
  }

  onCanvasUpdated(e) {
    this.thumbnail = e.detail;
  }

  render() {
    return html`
      <div class="container">
        <div class="left">
          <input-colour @colour-change=${this.onColourChange}></input-colour>
          <input-brush-pattern
            pattern=${this.brushPattern}
            colour=${this.brushColour}
            @pattern-change=${this.onPatternChange}
          ></input-brush-pattern>
          <Input-line-width
            value=${this.lineWidth}
            @line-width-change=${this.onLineWidthChange}
          ></Input-line-width>
          <input-line-cap
            @line-cap-change=${this.onLineCapChange}
          ></input-line-cap
          ><input-line-join
            @line-join-change=${this.onLineJoinChange}
          ></input-line-join>
          <select-gco @gco-change=${this.onGcoChange}></select-gco>
          <input-spin-speed
            value=${this.rotationIncrement}
            @spin-speed-change=${this.onSpinSpeedChange}
          ></input-spin-speed>
          <button-undo @undo=${this.onUndoClick}></button-undo>
          <button-add-to-gallery
            @add-to-gallery=${this.onAddToGallery}
          ></button-add-to-gallery>
          <button-reset @reset=${this.onReset}></button-reset>
          <spinner-gallery
            items=${this.galleryItems}
            @gallery-item-select=${this.onGalleryItemSelect}
          ></spinner-gallery>
        </div>
        <main>
          <rotating-canvas
            width="500"
            height="500"
            colour-bg="#fff"
            fps="120"
            colour-fg=${this.lineColour}
            brush-pattern=${this.brushPattern}
            rotation-increment=${this.rotationIncrement}
            @canvas-updated=${this.onCanvasUpdated}
          ></rotating-canvas>
        </main>
      </div>
    `;
  }
}
