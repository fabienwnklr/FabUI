import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./fab-button.scss?inline";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("fab-button")
export class FabButton extends LitElement {
  /**
   * The title of button
   */
  @property({ type: String })
  title = "title";

  @property({ type: Boolean })
  shadowSm = false;

  @property({ type: Boolean})
  disabled = false;

  render() {
    return html`
      <button part="button" title="${this.title}" ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fab-button": FabButton;
  }
}
