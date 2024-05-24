import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./fab-tooltip.scss?inline";

enum Trigger {
  Hover = "hover",
  Focus = "focus",
}

enum Position {
  Bottom = "bottom",
  Top = "top",
  Left = "left",
  Right = "right",
}
@customElement("fab-tooltip")
export class FabTooltip extends LitElement {
  @property({ type: String })
  target = "";

  @property({ type: Position })
  position = "bottom";

  @property({ type: Boolean })
  inline = false;

  @property({ type: Trigger })
  trigger = "focus";

  @property({ type: Boolean })
  arrow = true;

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
    this.$tooltip = this.shadowRoot?.getElementById(this._uuid);
    if (this.inline) {
      this._show();
    } else {
      if (!this.target) {
        throw new Error("Missing property 'target' for triggering tooltip.");
      }

      const target = document.querySelector(this.target);

      if (!target) {
        throw new Error("target not find : " + this.target)
      }
      if (this.trigger === "hover") {
        target.addEventListener("mouseover", this._show.bind(this));
        target.addEventListener("mouseleave", this._hide.bind(this));
      } else if (this.trigger === "focus") {
        target.setAttribute("tabindex", "0");
        target.addEventListener("focusin", this._show.bind(this));
        target.addEventListener("focusout", this._hide.bind(this));
      }
    }
  }

  _show() {
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
