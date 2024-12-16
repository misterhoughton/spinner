import { LitElement, html, css } from "lit-element";
import { customElement, state } from "lit/decorators";
import GalleryService from "../services/gallery.service";
import BrushService from "../services/brush.service";
import BackgroundService from "../services/background.service";
import TransformationService from "../services/transformation.service";
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
  @state({ type: Array }) galleryItems;
  @state({ type: Number }) rotationIncrement;
  @state() brushColour;

  constructor() {
    super();
    GalleryService.$images.subscribe((i) => {
      this.galleryItems = JSON.stringify(i);
      this.requestUpdate(); // Not sure why we need this
    });
  }

  onColourChange(e) {
    this.brushColour = e.detail;
    BrushService.lineColour = e.detail;
  }

  onBrushChange(e) {
    BrushService.brushPattern = e.detail;
  }

  onLineWidthChange(e) {
    BrushService.lineWidth = e.detail;
  }

  onLineCapChange(e) {
    BrushService.lineCap = e.detail;
  }

  onLineJoinChange(e) {
    BrushService.lineJoin = e.detail;
  }

  onSpinSpeedChange(e) {
    TransformationService.rotationIncrement = e.detail;
    this.rotationIncrement = e.detail;
    this.requestUpdate(); // Not sure why we need this
  }

  onGcoChange(e) {
    BrushService.blendingMode = e.detail;
  }

  onUndoClick() {
    UndoService.undo();
  }

  onAddToGallery() {
    GalleryService.addImage(UndoService.thumbnail);
  }

  onReset() {
    BackgroundService.reset();
  }

  render() {
    return html`
      <div class="container">
        <div class="left">
          <input-colour @colour-change=${this.onColourChange}></input-colour>
          <input-brush-pattern
            @pattern-change=${this.onBrushChange}
          ></input-brush-pattern>
          <Input-line-width
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
            @spin-speed-change=${this.onSpinSpeedChange}
          ></input-spin-speed>
          <button-undo @undo=${this.onUndoClick}></button-undo>
          <button-add-to-gallery
            @add-to-gallery=${this.onAddToGallery}
          ></button-add-to-gallery>
          <button-reset @reset=${this.onReset}></button-reset>
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
