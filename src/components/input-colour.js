import { LitElement, html, css } from "lit-element";
import { ref } from "lit/directives/ref.js";
import { map } from "lit/directives/map.js";
import { customElement } from "lit/decorators";
import {
  linear,
  easeInExpo,
  easeOutExpo,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInOutQuint,
} from "easing-utils";

function lerp(a, b, alpha) {
  return a + alpha * (b - a);
}

function scale(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

@customElement("input-colour")
class InputColour extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
    canvas {
      cursor: crosshair;
    }
    .recent {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      align-items: flex-start;
    }
    .palette-item {
      width: 30px;
      height: 30px;
      cursor: crosshair;
    }
  `;
  #canvas;
  #ctx;
  #height = 200;
  #width = 200;
  static properties = {
    value: {},
    recent: { type: Array },
  };

  static state = {};

  constructor() {
    super();
    this.recent = [];
  }

  getCanvas(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
  }

  addToRecent(col) {
    if (this.recent.length > 7) {
      this.recent.shift();
    }
    this.recent.push(col);
    this.requestUpdate();
  }

  firstUpdated() {
    super.firstUpdated();

    function makeGradient(_grad, _colours, _easeFn) {
      const len = _colours.length;
      _colours.forEach((colour, i) => {
        const scaled = scale(i, 0, len, 0, 1);
        const alpha = _easeFn(scaled);
        const offset = lerp(0, 1, alpha);
        _grad.addColorStop(offset, colour);
      });
    }

    const fillCtx = (_fillStyle, _gco) => {
      const defaultGco = "source-over";
      _gco = _gco || defaultGco;
      this.#ctx.fillStyle = _fillStyle;
      this.#ctx.globalCompositeOperation = _gco;
      this.#ctx.fillRect(0, 0, this.#width, this.#height);
      this.#ctx.globalCompositeOperation = defaultGco;
    };

    const w = this.#width;
    const h = this.#height;
    const colours = [
      "red",
      "magenta",
      "blue",
      "cyan",
      "green",
      "yellow",
      "red",
    ];
    const values = ["white", "black"];
    const colourGradient = this.#ctx.createLinearGradient(0, 0, w, 0);
    const darkenGradient = this.#ctx.createLinearGradient(0, 0, 0, h);
    const lightenGradient = this.#ctx.createLinearGradient(0, 0, 0, h);

    makeGradient(darkenGradient, values, easeOutExpo);
    makeGradient(colourGradient, colours, easeInOutSine);
    makeGradient(lightenGradient, values, easeInExpo);

    fillCtx(darkenGradient, "multiply");
    fillCtx(colourGradient, "overlay");
    fillCtx(lightenGradient, "screen");
  }

  pick(event) {
    const bounding = this.#canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = this.#ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;
    return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  }

  onClick(e) {
    const col = this.pick(e);
    this.emitColourChange(col);
    this.addToRecent(col);
  }

  emitColourChange(col) {
    this.dispatchEvent(
      new CustomEvent("colour-change", {
        detail: col,
      })
    );
  }

  render() {
    return html`<canvas
        @click=${this.onClick}
        ${ref(this.getCanvas)}
        height=${this.#height}
        width=${this.#width}
      ></canvas>
      <div class="recent">
        ${map(
          this.recent,
          (c) =>
            html`<div
              class="palette-item"
              style="background-color: ${c}"
              @click=${() => this.emitColourChange(c)}
            ></div>`
        )}
      </div> `;
  }
}
