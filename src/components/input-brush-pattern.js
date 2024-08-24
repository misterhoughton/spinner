import { LitElement, html } from "lit-element";
import { map } from "lit/directives/map.js";
import { customElement } from "lit/decorators";
import BrushService from "../services/brush.service";
import { brushPatterns } from "../brushPatterns";

@customElement("input-brush-pattern")
class InputBrushPattern extends LitElement {
  #lineWidth;
  #lineCol;
  firstUpdated() {
    BrushService.lineWidth.subscribe((lw) => (this.#lineWidth = lw));
    BrushService.lineColour.subscribe((col) => (this.#lineCol = col));
  }

  onChange(e) {
    BrushService.brushPattern = e.target.value;
  }

  render() {
    const _brushPatterns = [];
    for (let bp in brushPatterns) {
      _brushPatterns.push(html`<option>${bp}</option>`);
    }
    return html`<select @change="${this.onChange}">
      ${map(_brushPatterns, (bp) => bp)}
    </select>`;
  }
}
