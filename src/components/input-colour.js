import { LitElement, html, css } from "lit-element";
import { ref } from "lit/directives/ref.js";
import { customElement } from "lit/decorators";
import BrushService from "../services/brush.service";
import { DrawingTool } from "../DrawingTool";

function lerp(a, b, alpha) {
  return a + alpha * (b - a);
}

function scale(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function easeLinear(t, b, c, d) {
  return (c * t) / d + b;
}

function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}

function easeInExpo(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
  return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}

@customElement("input-colour")
class InputColour extends LitElement {
  static styles = css`
    canvas {
      cursor: crosshair;
    }
    .palette {
      width: 50px;
      height: 50px;
    }
  `;
  #canvas;
  #ctx;
  #height = 200;
  #width = 200;
  static properties = {
    value: { type: String },
  };

  getCanvas(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
  }

  firstUpdated() {
    super.firstUpdated();
    function makeGradient(_grad, _colours, _easeFn) {
      const len = _colours.length;
      _colours.forEach((colour, i) => {
        const eased = _easeFn(i, 0, len, len);
        const alpha = scale(eased, 0, len, 0, 1);
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
    const colourGradient = this.#ctx.createLinearGradient(0, 0, w, 0);
    const darkenGradient = this.#ctx.createLinearGradient(0, 0, 0, h);
    const lightenGradient = this.#ctx.createLinearGradient(0, 0, 0, h);

    const colours = ["cyan", "magenta", "yellow"];
    const values = ["white", "black"];

    makeGradient(colourGradient, colours, easeOutQuad);
    makeGradient(darkenGradient, values, easeOutExpo);
    makeGradient(lightenGradient, values, easeInQuad);

    fillCtx(darkenGradient);
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
    BrushService.lineColour = this.pick(e);
  }

  render() {
    return html`<canvas
      @click=${this.onClick}
      ${ref(this.getCanvas)}
      height=${this.#height}
      width=${this.#width}
    ></canvas> `;
  }
}
