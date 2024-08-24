import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import BrushService from "../services/brush.service";
import { property } from "lit/decorators.js";

@customElement("input-brush-colour")
class InputBrushColour extends LitElement {
  @property value;
  connectedCallback() {
    super.connectedCallback();
    BrushService.lineColour.subscribe((col) => (this.value = col));
  }
  render() {
    return html`<input
      type="color"
      value="${this.value}"
      @change="${(e) => (BrushService.lineColour = e.target.value)}"
    />`;
  }
}
