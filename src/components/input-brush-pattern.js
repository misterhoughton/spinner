import { LitElement, html } from "lit-element";
import { map } from "lit/directives/map.js";
import { customElement, property } from "lit/decorators";
import { brushPatterns } from "../brushPatterns";

import "./brush-thumbnail";

@customElement("input-brush-pattern")
class InputBrushPattern extends LitElement {
  static properties = {
    colour: {},
    pattern: {},
    width: {},
    height: {},
  };

  constructor() {
    super();
    this.width = 50;
    this.height = 50;
  }
  get #brushPatternOptions() {
    const _brushPatterns = [];
    for (let bp in brushPatterns) {
      _brushPatterns.push(html`<option>${bp}</option>`);
    }
    return _brushPatterns;
  }

  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("pattern-change", { detail: e.target.value })
    );
  }

  render() {
    return html`<brush-thumbnail
        height=${this.height}
        width=${this.width}
        pattern=${this.pattern}
        colour=${this.colour}
      ></brush-thumbnail>
      <select @change=${this.onChange}>
        ${map(this.#brushPatternOptions, (bp) => bp)}
      </select>`;
  }
}
