import { LitElement, html } from "lit-element";
import { map } from "lit/directives/map.js";
import { customElement } from "lit/decorators";
import { GCO } from "../GlobalCompositeOperations";

@customElement("select-gco")
class SelectGCO extends LitElement {
  onChange(e) {
    this.dispatchEvent(
      new CustomEvent("gco-change", { detail: e.target.value })
    );
  }
  render() {
    return html`<select @change="${this.onChange}">
      ${map(GCO, (op) => html`<option value="${op}">${op}</option>`)}
    </select>`;
  }
}
