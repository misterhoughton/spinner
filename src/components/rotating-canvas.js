import { LitElement, html, css } from "lit-element";
import { customElement } from "lit/decorators";
import { ref } from "lit/directives/ref.js";

import { rotatePoint } from "../utilities";
import { DrawingTool } from "../DrawingTool";
import { setCursor } from "../setCursor";
import BrushService from "../services/brush.service";
import UndoService from "../services/undo.service";
import BackgroundService from "../services/background.service";

@customElement("rotating-canvas")
class RotatingCanvas extends LitElement {
  #frame = 0;
  #rotationAngle = 0;
  #previousTimeStamp = 0;
  #callbacks = new Set();
  #requestID;
  fps = 1000 / 200;
  rotationIncrement = 0;
  canvas;
  context2d;

  static styles = css`
    :host {
      display: block;
    }
    canvas {
      border-radius: 50%;
    }
  `;

  static get properties() {
    return {
      width: {},
      height: {},
      colourBg: { attribute: "colour-bg" },
      colourFg: { attribute: "colour-fg" },
    };
  }

  #setRef = (_ref) => {
    if (_ref === undefined) {
      return;
    }
    this.canvas = _ref;
  };

  #getRotatedCoords(x, y) {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    return rotatePoint(cx, cy, x, y, this.#rotationAngle);
  }

  #tick(timeStamp) {
    const newRotationAngle = Math.floor(
      (this.#rotationAngle + this.rotationIncrement) % 360
    );
    if (timeStamp > this.#previousTimeStamp + this.fps) {
      this.#previousTimeStamp = timeStamp;
      this.#callbacks.forEach((fn) => fn());
      this.canvas.style.transform = `rotate(${this.#rotationAngle}deg)`;
      this.#rotationAngle = newRotationAngle;
      this.#frame += this.fps;
    }
    this.start();
  }

  #draw(e) {
    const touch = e.touches ? e.touches.item(0) : null;
    if (touch) {
      e.offsetX = touch.clientX - touch.target.offsetLeft;
      e.offsetY = touch.clientY - touch.target.offsetTop;
    }
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    this.#callbacks.clear();
    this.#drawTransformed(x, y);
    this.#holdLine(e);
  }

  #drawLine = (x, y) => {
    this.context2d.lineTo(x, y);
    this.context2d.stroke();
  };

  #drawStart(e) {
    UndoService.addToStack(this.canvas.toDataURL());
    this.context2d.beginPath();
    this.#holdLine(e);
  }

  #drawEnd = (e) => {
    this.context2d.closePath();
    this.#callbacks.clear();
    UndoService.thumbnail = this.canvas.toDataURL();
  };

  #drawTransformed(x, y) {
    const tc = this.#getRotatedCoords(x, y);
    this.#drawLine(tc.x, tc.y);
  }

  #holdLine(e) {
    const mouseIsStatic = (e) => {
      return e.movementX + e.movementY === 0;
    };
    const touch = e.touches ? e.touches.item(0) : null;
    const changedTouch = e.changedTouches ? e.changedTouches.item(0) : null;

    if (touch && changedTouch) {
      e.movementX = touch.pageX - changedTouch.pageX;
      e.movementY = touch.pageY - changedTouch.pageY;
      e.layerX = touch.clientX - touch.target.offsetLeft;
      e.layerY = touch.clientY - touch.target.offsetTop;
    }

    if (mouseIsStatic(e)) {
      // Only add callback if position has changed?
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      this.#callbacks.add(() => this.#drawTransformed(x, y));
    } else {
      this.#callbacks.clear();
    }
  }

  #requestAnimationFrame() {
    this.#requestID = window.requestAnimationFrame(this.#tick.bind(this));
  }

  #clearCanvas() {
    this.context2d.fillStyle = this.colourBg;
    this.context2d.fillRect(0, 0, this.width, this.height);
  }

  #undo(dataUrl) {
    if (dataUrl) {
      const image = new Image(60, 45);
      image.src = dataUrl;
      this.context2d.save();
      this.#clearCanvas();
      image.onload = () => {
        this.context2d.drawImage(image, 0, 0, this.width, this.height);
        this.context2d.restore();
      };
    }
  }

  start() {
    this.#requestAnimationFrame();
  }

  stop() {
    if (this.#requestID) {
      cancelAnimationFrame(requestID);
    }
  }

  getCurrentImage() {
    return this.canvas.toDataURL();
  }

  firstUpdated() {
    this.context2d = this.canvas.getContext("2d");
    this.#clearCanvas();

    new DrawingTool(
      this.canvas,
      this.#drawStart.bind(this),
      this.#draw.bind(this),
      this.#drawEnd.bind(this)
    );

    BrushService.lineWidth.subscribe((lineWidth) => {
      this.context2d.lineWidth = lineWidth;
      setCursor(lineWidth, this.canvas);
    });

    BrushService.strokeStyle.subscribe(
      (style) => (this.context2d.strokeStyle = style)
    );

    BrushService.rotationIncrement.subscribe(
      (increment) => (this.rotationIncrement = increment)
    );

    BrushService.lineCap.subscribe(
      (lineCap) => (this.context2d.lineCap = lineCap)
    );

    BrushService.lineJoin.subscribe(
      (lineJoin) => (this.context2d.lineJoin = lineJoin)
    );

    BrushService.blendingMode.subscribe(
      (mode) => (this.context2d.globalCompositeOperation = mode)
    );

    UndoService.$undoNotifier.subscribe((blob) => this.#undo(blob));
    this.start();

    BackgroundService.$backgroundImg.subscribe((img) => {
      const imgEl = new Image(this.width, this.height);
      imgEl.src = img;
      this.context2d.drawImage(imgEl, 0, 0, this.width, this.height);
    });

    BackgroundService.$onReset.subscribe(() => this.#clearCanvas());
  }

  render() {
    return html`
      <canvas
        height="${this.height}"
        width="${this.width}"
        ${ref(this.#setRef)}
      ></canvas>
    `;
  }
}
