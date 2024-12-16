import { LitElement, html, css } from "lit-element";
import { customElement } from "lit/decorators";
import "./gallery-item";

@customElement("spinner-gallery")
class SpinnerGallery extends LitElement {
  constructor() {
    super();
    this.items = [];
  }
  static get styles() {
    return css`
      ul {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        column-gap: 10px;
        row-gap: 10px;
        margin-top: 2rem;
      }
      li {
        display: block;
        width: 20%;
        height: 20%;
      }
    `;
  }
  static get properties() {
    return {
      items: { type: Array },
      target: {},
    };
  }
  render() {
    const itemTemplates = [];
    if (this.items) {
      for (const i of this.items) {
        itemTemplates.push(
          html`<li>
            <gallery-item src="${i}" target="${this.target}"></gallery-item>
          </li>`
        );
      }
    }

    return html` <ul>
      ${itemTemplates}
    </ul>`;
  }
}
