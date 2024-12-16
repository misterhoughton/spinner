import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

@customElement("input-line-cap")
class InputLineCap extends LitElement {
  static get properties() {
    return {
      items: {},
    };
  }

  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("line-cap-change", {
        detail: e.target.value,
      })
    );
  }

  render() {
    return html`<fieldset @change="${this.onChange}">
      <legend>Line Cap</legend>
      <label>Butt</label><input type="radio" name="lineCap" value="butt" />
      <label>Round</label><input type="radio" name="lineCap" value="round" />
      <label>Square</label><input type="radio" name="lineCap" value="square" />
    </fieldset>`;
  }
}
