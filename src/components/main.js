import { LitElement, html } from "lit-element";
import { customElement } from "lit/decorators";

import "./rotating-canvas";

@customElement("main-app")
class MyElement extends LitElement {
  render() {
    return html`<rotating-canvas width="100" height="100"></rotating-canvas>`;
  }
}
