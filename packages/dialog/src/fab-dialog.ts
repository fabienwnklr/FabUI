import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("fab-dialog")
export class FabDialog extends LitElement {
  @property({ type: Boolean })
  visible = false;

  @property({ type: Boolean })
  movable = false;

  @property({ type: Boolean })
  reducible = false;

  @property({ type: Boolean })
  expandable = false;

  @property({ type: Boolean })
  closable = true;

  @property({ type: String })
  colorPrimary = "#3e3e3e";

  @property({ type: Boolean })
  fullscreen = false;

  @property({ type: Boolean })
  resizable = false;

  private _disX = 0;
  private _disY = 0;

  /**
   * @property {HTMLDivElement} $el Dialog element
   */
  public $el: HTMLDivElement = document.createElement("div");
  /**
   * @property {Boolean} isFullScreen
   */
  public isFullScreen = false;
  /**
   * @property {Boolean} isFocused
   */
  public isFocused = true;
  /**
   * @property {Boolean} isReduced
   */
  public isReduced = false;
  /**
   * @property {String} name
   */
  public name = "fab-dialog";
  /**
   * @property {Object} selector
   */
  public selector = {
    el: `${this.name}`,
    header: `${this.name}-header`,
    title: `${this.name}-title`,
    icons: `${this.name}-icons`,
    reduce: `reduce`,
    expand: `expand`,
    close: `close`,
    body: `${this.name}-body`,
    footer: `${this.name}-footer`,
    dragging: `is-dragging`,
  };

  /**
   * method for render html dialog
   */
  render() {
    console.log(this.visible);
    return html`
      <div
        @focus=${this.setFocused.bind(this)}
        tabindex="0"
        class="${this.selector.el}${this.visible ? " show" : ""}${this.movable
          ? " draggable"
          : ""}${this.resizable ? " resizable" : ""} focused"
      >
        <div class="${this.selector.header}">
          <slot name="title">
            <h3 class="${this.selector.title}">Default Heading</h3>
          </slot>
          <slot name="icons">
            <div class="${this.selector.icons}">
              ${this.reducible
                ? html`<button
                    @pointerdown=${this.toggleReduce.bind(this)}
                    class="${this.selector.reduce}"
                  ></button>`
                : ""}
              ${this.expandable
                ? html`<button
                    @pointerdown=${this.toggleFullscreen.bind(this)}
                    class="${this.selector.expand}"
                  ></button>`
                : ""}
              ${this.closable
                ? html`<button
                    @pointerdown=${this.destroy.bind(this)}
                    class="${this.selector.close}"
                  ></button>`
                : ""}
            </div>
          </slot>
        </div>
        <div class="${this.selector.body}">
          <slot name="body">
            <div>Default Body</div>
          </slot>
        </div>
        <div class="${this.selector.footer}">
          <slot name="footer">
            <div>Default Footer</div>
          </slot>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.$el = this.renderRoot.querySelector(
      `.${this.selector.el}`
    ) as HTMLDivElement;

    this.toggleReduce = this.toggleReduce.bind(this);
    this.setFocused = this.setFocused.bind(this);
    this._fnDown = this._fnDown.bind(this);
    this._fnMove = this._fnMove.bind(this);
    this._fnUp = this._fnUp.bind(this);
    this._initHandler();
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    if (this.getAttribute(name) && value) {
      this.setAttribute(name, value);
    }
  }

  /**
   * Dispatch a custom event preceded by 'fabmodal:'
   *
   * @param {string} eventName Custom event name to dispatch
   */
  private _dispatchFabModalEvent(eventName: string): void {
    this.dispatchEvent(new CustomEvent(`fab.modal.${eventName}`));
  }

  /**
   * Toggle reduce
   */
  async toggleReduce() {
    if (this.isReduced) {
      this.$el
        .querySelector(`.${this.selector.title}`)
        ?.removeEventListener("pointerdown", this.toggleReduce);
      this._initDrag();
      this.$el.classList.remove("reduced");
      this._dispatchFabModalEvent("restored");
      this.isReduced = false;
    } else {
      this.$el
        .querySelector(`.${this.selector.title}`)
        ?.addEventListener("pointerdown", this.toggleReduce);
      this.$el.classList.add("reduced");
      this.$el.removeEventListener("mousedown", this._fnDown);
      this._dispatchFabModalEvent("reduced");
      this.isReduced = true;
    }
  }

  /**
   * Focus dialog with z-index
   */
  setFocused() {
    const dialogs = document.querySelectorAll("fab-dialog");

    dialogs.forEach((dialog) => {
      if (dialog !== this) {
        dialog.$el.classList.remove("focused");
        dialog.$el.tabIndex = 0;
      } else {
        dialog.$el.classList.add("focused");
        dialog.$el.tabIndex = 1;
      }
    });

    this.$el.classList.add("focused");
  }

  /**
   * Apply blink effet , usefull if some dialog opened
   */
  blink() {
    this.$el.classList.add("blink");

    window.setTimeout(() => {
      this.$el.classList.remove("blink");
    }, 1000);
  }

  /**
   * Init drag moving dialog event
   */
  private _initDrag() {
    this.$el.addEventListener("mousedown", this._fnDown);
  }

  /**
   * Init handler
   */
  private _initHandler() {
    this.$el.addEventListener("focus", this.setFocused);

    if (this.movable) {
      this._initDrag();
    }
    if (this.resizable) {
      // const observer = new ResizeObserver((mutations) => {
      // const { right, top, bottom, left } = this.$el.getBoundingClientRect()
      // const [{ contentRect: { width, height } }] = mutations;
      // const limitTop = 0;
      // const limitBottom = window.innerHeight;
      // const limitLeft = 0;
      // const limitRight = window.innerWidth;
      // if (left > limitLeft && left < limitRight && right < limitRight && right > limitLeft) {
      //   // this.shadowRoot
      //   this.$el.style.width = `${width}px`;
      // } else {
      //   this.$el.style.width = this.$el.style.width;
      // }
      // if (top > limitTop && top < limitBottom) {
      //   this.$el.style.top = `${height}px`;
      // }
      // });
      // observer.observe(this.$el);
    }
  }

  /**
   * init event on mouse down
   * @ignore
   */
  private _fnDown(ev: MouseEvent) {
    const target = ev.target as HTMLElement;

    if (
      !target?.classList.contains(this.selector.header) &&
      !target?.classList.contains(this.selector.title) &&
      (!target.slot || (target.slot && target.slot !== "title"))
    )
      return;

    this._disX = ev.clientX - this.$el.offsetLeft;
    this._disY = ev.clientY - this.$el.offsetTop;

    document.onmousemove = this._fnMove;
    document.onmouseup = this._fnUp;

    return false;
  }

  /**
   * Move dialog during moving
   * @ignore
   */
  private _fnMove(ev: MouseEvent) {
    this.$el.classList.add(this.selector.dragging);
    const left = ev.clientX - this._disX;
    const top = ev.clientY - this._disY;
    const limitRight = window.innerWidth - this.$el.clientWidth / 2;
    const limitLeft = this.$el.clientWidth / 2;
    const limitTop = this.$el.clientHeight / 2;
    const limitBottom = window.innerHeight - this.$el.clientHeight / 2;

    if (left > limitLeft && left < limitRight) {
      this.$el.style.left = `${left}px`;
    } else if (left > limitLeft) {
      this.$el.style.left = `${limitRight}px`;
    } else if (left < limitRight) {
      this.$el.style.left = `${limitLeft}px`;
    }

    if (top > limitTop && top < limitBottom) {
      this.$el.style.top = `${top}px`;
    } else if (top > limitBottom) {
      this.$el.style.top = `${limitBottom}px`;
    } else if (top < limitTop) {
      this.$el.style.top = `${limitTop}px`;
    }
  }

  /**
   * remove drag mouse event
   * @ignore
   */
  private _fnUp() {
    document.onmousemove = null;
    document.onmouseup = null;
    this.$el.classList.remove(this.selector.dragging);
  }

  /**
   * toggle fullscreen dialog
   * @returns {Promise<boolean>}
   */
  async toggleFullscreen(): Promise<boolean> {
    if (!this.isFocused) {
      this.setFocused();
    }
    if (this.isFullScreen) {
      if (this.movable) this._initDrag();
      this.isFullScreen = false;
      // this.$bodyElement.style.overflow = 'auto';
      this.$el.classList.remove("fullScreen");
      // if (this.$expand) this.$expand.title = 'Restore';

      this._dispatchFabModalEvent("fullscreenCancel");
    } else {
      if (this.isReduced) await this.toggleReduce();
      this.$el.removeEventListener("mousedown", this._fnDown, true);
      this.isFullScreen = true;
      // this.$bodyElement.style.overflow = 'hidden';
      this.$el.classList.add("fullScreen");
      this._dispatchFabModalEvent("fullscreen");
    }
    return this.isFullScreen;
  }

  /**
   * Show dialog if is hidden
   */
  show() {
    this._dispatchFabModalEvent("show");
    this.setAttribute("visible", "");
    this._dispatchFabModalEvent("hidden");
  }

  /**
   * Toggle visiblity of dialog
   */
  toggle() {
    this._dispatchFabModalEvent("toggle");
    this.toggleAttribute("visible");
    this._dispatchFabModalEvent("toggled");
  }

  /**
   * Hide dialog if is visible
   */
  hide() {
    this._dispatchFabModalEvent("hide");
    this.removeAttribute("visible");
    this._dispatchFabModalEvent("hidden");
  }

  /**
   * Remove dialog from DOM
   */
  destroy() {
    this._dispatchFabModalEvent("destroy");
    this.remove();
    this._dispatchFabModalEvent("destroyed");
  }

  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      font-weight: 400;
      --fab-dialog-color: rgba(255, 255, 255, 0.87);
      --fab-dialog-background-color: #333333;
      --fab-dialog-shadow-color: rgba(255, 255, 255, 0.3);

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }
    * {
      box-sizing: border-box;
    }

    @media (prefers-color-scheme: light) {
      :host {
        --fab-dialog-color: #213547;
        --fab-dialog-background-color: #ffffff;
        --fab-dialog-shadow-color: rgba(0, 0, 0, 0.3);
      }
    }

    .fab-dialog {
      outline: none;
      z-index: 998;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      box-shadow: 0 0 8px var(--fab-dialog-shadow-color);
      box-sizing: border-box;
      width: 500px;
      height: 400px;
      max-width: 100%;
      max-height: 100%;
      min-width: 30%;
      min-height: 40%;
      border-radius: 5px;
      display: none;
      overflow: hidden;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }

    .fab-dialog.resizable {
      resize: both;
    }

    .fab-dialog.focused {
      z-index: 999;
    }

    .fab-dialog.is-dragging {
      user-select: none;
    }

    .blink {
      animation: blinker 0.5s linear infinite;
    }

    @keyframes blinker {
      50% {
        box-shadow: var(--fab-dialog-shadow-color) 0px 4px 16px,
          var(--fab-dialog-shadow-color) 0px 8px 24px,
          var(--fab-dialog-shadow-color) 0px 16px 30px;
      }
    }

    .fab-dialog.show,
    .fab-overlay.show,
    .fab-dialog-tab.show {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }

    .fab-tab-close {
      border: 0;
      background-color: transparent;
      color: white;
      cursor: pointer;
    }

    .fab-dialog.draggable .fab-dialog-header {
      cursor: move;
    }

    .fab-dialog.fullScreen {
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      max-width: 100%;
      max-height: 100%;
      border-radius: 0;
      transform: unset;
      resize: none;
    }

    .fab-dialog.fullScreen .fab-dialog-header {
      border-radius: 0;
      cursor: default;
    }

    .fab-dialog.fullScreen .fab-dialog-body {
      height: 100%;
      max-width: 100%;
    }

    .fab-dialog.active {
      z-index: 1000;
    }

    .fab-dialog .fab-dialog-body::-webkit-scrollbar {
      width: 5px;
    }

    .fab-dialog .fab-dialog-body::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .fab-dialog .fab-dialog-body::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    .fab-dialog .fab-dialog-body::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .fab-dialog.iframe {
      border-bottom: none;
      background-color: #000;
    }

    .fab-dialog.iframe .fab-dialog-header {
      background-color: #000;
    }

    .fab-dialog.iframe .fab-dialog-body {
      padding: 0;
      color: rgba(0, 0, 0, 0.8);
    }

    .fab-dialog .fab-dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      cursor: default;
      border-bottom: 1px solid #d8d8d8;
      background-color: #d8d8d8;
      color: #000;
      width: 100%;
    }

    .fab-dialog .fab-dialog-header.draggable {
      cursor: move;
    }

    .fab-dialog .fab-dialog-header .fab-dialog-title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 1rem;
      margin: 0;
      color: rgba(0, 0, 0, 0.8);
    }

    .fab-dialog .fab-dialog-header .fab-dialog-icons {
      display: flex;
      margin-right: 0.5rem;
    }

    .fab-dialog .fab-dialog-header .fab-dialog-icons button {
      outline: none;
      background: transparent;
      border: transparent;
      width: 25px;
      height: 25px;
      cursor: pointer;
      padding: 0;
      opacity: 0.5;
      transition: opacity 0.2s ease-in;
    }

    .fab-dialog .fab-dialog-header .fab-dialog-icons button:before {
      color: rgba(0, 0, 0, 0.8);
      font-weight: 300;
      font-size: 1.2rem;
      font-family: Arial, sans-serif;
    }

    .fab-dialog .fab-dialog-header .fab-dialog-icons button:hover {
      opacity: 1;
    }

    .fab-dialog .fab-dialog-header .fab-dialog-icons .reduce:before {
      content: "\\2012";
    }

    .fab-dialog .fab-dialog-header .fab-dialog-icons .expand:before {
      content: "\\26F6";
    }
    .fab-dialog .fab-dialog-header .fab-dialog-icons .close:before {
      content: "\\2715";
    }

    .fab-dialog .fab-dialog-body {
      scroll-behavior: smooth;
      position: relative;
      padding: 1rem;
      flex: 1;
      line-height: 1.8;
      color: #0a0a0a;
      overflow: auto;
      color: var(--fab-dialog-color);
      background-color: var(--fab-dialog-background-color);
      width: 100%;
    }

    .fab-dialog.reduced {
      bottom: 0 !important;
      left: 0 !important;
      top: inherit !important;
      height: auto !important;
      resize: none !important;
      transform: none !important;
      min-width: inherit !important;
      min-height: inherit !important;
      width: 15% !important;
      transition: all 1s ease !important;
    }

    .fab-dialog.reduced .fab-dialog-header {
      cursor: pointer !important;
    }

    .fab-dialog.reduced .fab-dialog-icons .reduce:before {
      content: "+" !important;
    }

    .fab-dialog.reduced .fab-dialog-body,
    .fab-dialog.reduced .fab-dialog-footer {
      display: none;
    }

    .fab-dialog .fab-dialog-footer {
      position: relative;
      padding: 1rem;
      max-width: 100%;
      height: auto;
      line-height: 1.8;
      color: var(--fab-dialog-color);
      background-color: var(--fab-dialog-background-color);
      border-top: 1px solid var(--fab-dialog-color);
      display: flex;
      justify-content: end;
      align-items: center;
      width: 100%;
      bottom: 0;
      min-height: 60px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fab-dialog": FabDialog;
  }
}
