import { LitElement, html } from "lit-element";
import { map } from "lit/directives/map.js";
import { customElement } from "lit/decorators";
import { GCO } from "../GlobalCompositeOperations";
import BrushService from "../services/brush.service";

@customElement("select-gco")
class SelectGCO extends LitElement {
  render() {
    return html`<select
      @change="${(e) => (BrushService.blendingMode = e.target.value)}"
    >
      ${map(GCO, (op) => html`<option value="${op}">${op}</option>`)}
    </select>`;
  }
}
