import { LitElement, html } from "lit-element";
import { map } from "lit/directives/map.js";
import { ref } from "lit/directives/ref.js";
import { customElement, property, state } from "lit/decorators";
import BrushService from "../services/brush.service";
import { brushPatterns } from "../brushPatterns";
import { combineLatest } from "rxjs";

import "./brush-thumbnail";

@customElement("input-brush-pattern")
class InputBrushPattern extends LitElement {
  #canvas;

  #brushPattern;
  #brushColour;
  #height = 50;
  #width = 50;

  get #brushPatternOptions() {
    const _brushPatterns = [];
    for (let bp in brushPatterns) {
      _brushPatterns.push(html`<option>${bp}</option>`);
    }
    return _brushPatterns;
  }

  firstUpdated() {
    super.firstUpdated();
    combineLatest([
      BrushService.brushPattern,
      BrushService.lineColour,
    ]).subscribe((res) => {
      this.#brushPattern = res[0];
      this.#brushColour = res[1];
      this.requestUpdate();
    });
  }

  onChange(e) {
    BrushService.brushPattern = e.target.value;
    this.#brushPattern = e.target.value;
    this.requestUpdate();
  }

  render() {
    return html`<brush-thumbnail
        height=${this.#height}
        width=${this.#width}
        pattern=${this.#brushPattern}
        colour=${this.#brushColour}
      ></brush-thumbnail>
      <select @change=${this.onChange}>
        ${map(this.#brushPatternOptions, (bp) => bp)}
      </select>`;
  }
}
