import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./fab-tooltip.scss?inline";

@customElement("fab-tooltip")
export class FabTooltip extends LitElement {
  @property({ type: String })
  target = "";

  @property({ type: String })
  position = "bottom";

  @property({ type: Boolean })
  inline = true;

  @property({ type: Boolean })
  arrow = false;

  private _uuid = Date.now().toString();
  private $tooltip: HTMLElement | null | undefined;

  render() {
    return html`
      <div
        id="${this._uuid}"
        class="tooltip ${this.position}${!this.arrow ? " no-arrow" : ""}"
      >
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  firstUpdated(): void {
    if (this.inline) {
      this._show();
    }
  }

  _show() {
    this.$tooltip = this.shadowRoot?.getElementById(this._uuid);

    this.$tooltip?.classList.add("show");
  }

  _hide() {
    this.$tooltip?.classList.remove("show");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fab-tooltip": FabTooltip;
  }
}
