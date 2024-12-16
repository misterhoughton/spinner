import { LitElement, html } from "lit-element";
import { map } from "lit/directives/map.js";
import { customElement } from "lit/decorators";
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
    this.#brushPattern = e.target.value;
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("pattern-change", { detail: e.target.value })
    );
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
