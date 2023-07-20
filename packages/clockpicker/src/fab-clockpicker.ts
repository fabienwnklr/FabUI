import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Ref, createRef, ref } from 'lit/directives/ref.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fab-clockpicker')
export class FabClockpicker extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The value to set
   */
  @property({ type: String })
  value = this.now

  /**
   * The name of input
   */
  @property({ type: String })
  name = "clockpicker-" + Date.now()

  /**
   * The custom class of input
   */
  @property({ type: String })
  class = "fab__clockpicker_input"

  /**
   * Append clock icon
   */
  @property({ type: Boolean })
  appendIcon = true

  /**
   * Prepend clock icon
   */
  @property({ type: Boolean })
  prependIcon = true

  /**
   * Icon to display if appendIcon is true
   */
  @property({ type: Boolean })
  icon = ""

  inputRef: Ref<HTMLInputElement> = createRef();
  clockpickerRef: Ref<HTMLDivElement> = createRef();

  template() {
    return html`
      <div ${ref(this.clockpickerRef)} class="fab__clockpicker">
        <div class="fab__clockpicker__header">
          header
        </div>
        <div class="fab__clockpicker__body">
          body
        </div>
        <div class="fab__clockpicker__footer">
          footer
        </div>
      </div>
    `
  }

  showClockpicker() {
    this.$clockpicker ? this.$clockpicker.classList.add("show") : false;
  }

  hideClockpicker() {
    this.$clockpicker ? this.$clockpicker.classList.remove("show") : false;
  }

  render() {
    return html`
      <input @focus=${this.showClockpicker} @focusout=${this.hideClockpicker}  ${ref(this.inputRef)} @change=${console.log} type="text" class="${this.class}" autocomplete="off" value="${this.value}" name="${this.name}">
      ${this.template()}
    `
  }

  get $input() {
    return this.inputRef.value;
  }

  get $clockpicker() {
    return this.clockpickerRef.value;
  }

  get now() {
    const date = new Date();

    return date.toLocaleTimeString();
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .fab__clockpicker_input {
      border: 1px solid #e3e3e4;
      border-radius: .2rem;
      padding: .4rem;
    }

    .fab__clockpicker_input:focus {
      outline-color: #535bf2;
    }

    .fab__clockpicker {
      display: flex;
      align-items: center;
      flex-direction: column;
      transition: opacity .3s ease-out;
      opacity: 0;
      height: 0;
      overflow: hidden;
      position: absolute;
      min-width: 200px;
      border-radius: 1rem;
      box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    }

    .fab__clockpicker.show {
      opacity: 1;
      height: auto;
    }

    .fab__clockpicker .fab__clockpicker__header,
    .fab__clockpicker .fab__clockpicker__body,
    .fab__clockpicker .fab__clockpicker__footer {
      margin: .2rem;
      width: 100%;
    }

    .fab__clockpicker .fab__clockpicker__body {
      background-color: #f8f9fa;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'fab-clockpicker': FabClockpicker
  }
}
