import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";
import BackgroundService from "../services/background.service";

@customElement("button-reset")
class ButtonReset extends LitElement {
  render() {
    return html`<button @click="${() => BackgroundService.reset()}">
      reset
    </button>`;
  }
}
