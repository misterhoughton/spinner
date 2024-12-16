import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

@customElement("input-line-join")
class InputLineJoin extends LitElement {
  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("line-join-change", {
        detail: e.target.value,
      })
    );
  }
  render() {
    return html`<fieldset @change="${this.onChange}">
      <legend>Line Join</legend>
      <label>Round</label><input type="radio" name="lineCap" value="round" />
      <label>Bevel</label><input type="radio" name="lineCap" value="bevel" />
      <label>Miter</label><input type="radio" name="lineCap" value="miter" />
    </fieldset>`;
  }
}
