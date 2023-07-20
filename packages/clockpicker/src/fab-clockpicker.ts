import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fab-clockpicker')
export class FabClockpicker extends LitElement {
  /**
   * The value to set
   */
  @property({ attribute: 'value' })
  value = '';

  /**
   * The name of input
   */
  @property({ attribute: 'name' })
  name = 'clockpicker';

  /**
   * The custom class of input
   */
  @property({ attribute: 'class' })
  inputClass = 'fab__clockpicker__input';

  /**
   * Prepend clock icon
   */
  @property({ type: Boolean })
  prependIcon = false;

  /**
   * Append clock icon
   */
  @property({ type: Boolean })
  appendIcon = true;

  /**
   * Icon to display if appendIcon is true
   */
  @property({ type: Boolean })
  icon = true;

  /**
   * Auto close clockpicker when time selected
   */
  @property({ type: Boolean })
  autoClose = true;

  /**
   * Force position for clockpicker
   * can be topand bottom
   * default is bottom
   */
  @property({ type: String })
  position = 'bottom';

  /**
   * Format for hours
   */
  @property({ type: String })
  format = 'us';

  /**
   * @property {String} packageName packahe name
   */
  protected packageName = 'fab__clockpicker';
  /**
   * @property {HTMLDivElement} $el Clockpicker element
   */
  public $el: HTMLDivElement = document.createElement('div');

  inputRef: Ref<HTMLInputElement> = createRef();
  clockpickerRef: Ref<HTMLDivElement> = createRef();
  iconRef: Ref<HTMLDivElement> = createRef();

  get clockpickerHTML() {
    return html`
      <div ${ref(this.clockpickerRef)} class="${this.packageName}">
        <div class="${this.packageName}__header">
          <button>${this.currentHour}</button>
          <span>:</span>
          <button>${this.currentMinutes}</button>
        </div>
        <div class="${this.packageName}__body">
          ${this.hoursHTML} ${this.minutesHTML}
        </div>
        <div class="${this.packageName}__footer">
          <button>Clear</button>
          <button>Done</button>
        </div>
      </div>
    `;
  }

  get currentHour() {
    const hour = new Date().getHours();
    return hour < 10 ? `0${hour}` : hour;
  }

  get currentMinutes() {
    const minutes = new Date().getMinutes();
    return minutes < 10 ? `0${minutes}` : minutes;
  }

  get iconHTML() {
    return html` <div
      class="${this.packageName}__icon"
      @click=${this.showClockpicker()}
      ${ref(this.iconRef)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path
          d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"
        />
      </svg>
    </div>`;
  }

  get hoursHTML() {
    const USHours = [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const FRHours = [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];

    const hours = this.format == 'us' ? USHours : FRHours;

    const data = hours
        .map(hour => html`<div class="${this.packageName}__hour">${hour}</div>`);

    return html`<div class="${this.packageName}__hours">${data}</div>`;
  }

  get minutesHTML() {
    const minutes = [
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
    ];

    const data = minutes
        .map(minute => html`<div class="${this.packageName}__minute">${minute}</div>`);

    return html`<div class="${this.packageName}__minutes">${data}</div>`;
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

  showClockpicker() {
    this.$clockpicker?.classList.add('show');
  }

  hideClockpicker(event: FocusEvent, force = false) {
    if (event.target) {
      if (event.target instanceof FabClockpicker && !force) {
        return;
      }
    }
    this.$clockpicker?.classList.remove('show');
  }

  render() {
    return html`
      <div class="${this.packageName}__container">
        ${!this.appendIcon && this.prependIcon ? this.iconHTML : ''}
        ${this.position === 'top' ? this.clockpickerHTML : ''}
        <input
          @focus=${this.showClockpicker}
          ${ref(this.inputRef)}
          @change=${console.log}
          type="text"
          class="${this.inputClass}"
          autocomplete="off"
          value="${this.value}"
          name="${this.name}"
        />
        ${this.appendIcon && !this.prependIcon ? this.iconHTML : ''}
      </div>
      ${this.position === 'bottom' ? this.clockpickerHTML : ''}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.$el = this.renderRoot.querySelector(
      `.${this.packageName}`
    ) as HTMLDivElement;

    this._initHandler();
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, _old, value);
    if (value === _old) return;

    if (typeof value === 'string') {
      this.setAttribute(name, value);
    }
  }

  /**
   * Dispatch a custom event preceded by 'fabmodal:'
   *
   * @param {string} eventName Custom event name to dispatch
   */
  private _dispatchFabclockpickerEvent(eventName: string): void {
    this.dispatchEvent(new CustomEvent(`fab.clockpicker.${eventName}`));
  }

  private _initHandler() {
    document.addEventListener('pointerdown', this.hideClockpicker.bind(this));
  }

  destroy() {
    this.remove();
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .fab__clockpicker__container {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .fab__clockpicker__input {
      border: 1px solid #e3e3e4;
      border-radius: 0.2rem;
      padding: 0.4rem;
    }

    .fab__clockpicker__input:focus {
      outline-color: #535bf2;
    }

    .fab__clockpicker__icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: min-content;
      border: 1px solid #e3e3e4;
      border-radius: 0.2rem;
    }

    .fab__clockpicker {
      display: flex;
      align-items: center;
      flex-direction: column;
      transition: opacity 0.3s ease-out;
      opacity: 0;
      height: 0;
      overflow: hidden;
      position: absolute;
      min-width: 200px;
      border-radius: 0.4rem;
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
      font-family: sans-serif;
    }

    .fab__clockpicker.show {
      opacity: 1;
      height: auto;
    }

    .fab__clockpicker .fab__clockpicker__header,
    .fab__clockpicker .fab__clockpicker__body {
      margin: 0.2rem;
    }

    .fab__clockpicker .fab__clockpicker__header,
    .fab__clockpicker .fab__clockpicker__body,
    .fab__clockpicker .fab__clockpicker__footer {
      width: 100%;
    }

    .fab__clockpicker .fab__clockpicker__header button {
      color: #646cff;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      background-color: transparent;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .fab__clockpicker .fab__clockpicker__header button:hover {
      background-color: #f1f1f1;
    }

    .fab__clockpicker .fab__clockpicker__body {
      background-color: #f1f1f1;
    }

    .fab__clockpicker .fab__clockpicker__body .hours {
    }

    .fab__clockpicker .fab__clockpicker__body .minutes {
    }

    .fab__clockpicker .fab__clockpicker__footer {
      display: flex;
    }

    .fab__clockpicker .fab__clockpicker__footer button {
      min-width: 50%;
      color: #646cff;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .fab__clockpicker .fab__clockpicker__footer button:hover {
      background-color: #646cff;
    }
    .fab__clockpicker .fab__clockpicker__footer button:focus,
    .fab__clockpicker .fab__clockpicker__footer button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      .fab__clockpicker .fab__clockpicker__footer button {
        background-color: #f9f9f9;
      }
      .fab__clockpicker .fab__clockpicker__footer button:hover {
        color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'fab-clockpicker': FabClockpicker;
  }
}
