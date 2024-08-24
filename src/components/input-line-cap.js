import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import BrushServer from "../services/brush.service";

@customElement("input-line-cap")
class InputLineCap extends LitElement {
  static get properties() {
    return {
      items: {},
    };
  }

  setLineCap(e) {
    BrushServer.lineCap = e.target.value;
  }

  render() {
    return html`<fieldset @change="${this.setLineCap}">
      <legend>Line Cap</legend>
      <label>Butt</label><input type="radio" name="lineCap" value="butt" />
      <label>Round</label><input type="radio" name="lineCap" value="round" />
      <label>Square</label><input type="radio" name="lineCap" value="square" />
    </fieldset>`;
  }
}
