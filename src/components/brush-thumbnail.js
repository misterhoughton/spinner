import { LitElement, html } from "lit-element";
import { ref } from "lit/directives/ref.js";
import { customElement, property } from "lit/decorators";
import { brushPatterns } from "../brushPatterns";

@customElement("brush-thumbnail")
class BrushThumbnail extends LitElement {
  #ctx;
  static properties = {
    colour: {},
    pattern: {},
    width: {},
    height: {},
  };

  #getCanvas(canvas) {
    this.#ctx = canvas.getContext("2d");
  }

  update() {
    super.update();
    const params = [0, 0, this.width, this.height];
    this.#ctx.clearRect(...params);
    if (brushPatterns.hasOwnProperty(this.pattern)) {
      this.#ctx.fillStyle = brushPatterns[this.pattern](
        this.height,
        this.colour
      );
    }
    this.#ctx.fillRect(...params);
  }

  render() {
    return html`<canvas
      width=${this.width}
      height=${this.height}
      ${ref(this.#getCanvas)}
    ></canvas>`;
  }
}
