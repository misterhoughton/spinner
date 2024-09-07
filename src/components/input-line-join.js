import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import BrushServer from "../services/brush.service";

@customElement("input-line-join")
class InputLineJoin extends LitElement {
  setLineJoin(e) {
    BrushServer.lineJoin = e.target.value;
  }
  render() {
    return html`<fieldset @change="${this.setLineJoin}">
      <legend>Line Join</legend>
      <label>Round</label><input type="radio" name="lineCap" value="round" />
      <label>Bevel</label><input type="radio" name="lineCap" value="bevel" />
      <label>Miter</label><input type="radio" name="lineCap" value="miter" />
    </fieldset>`;
  }
}