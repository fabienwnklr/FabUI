/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable wc/guard-super-call */
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';


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
   * locale for hours
   */
  @property({ type: String })
  locale = navigator.language || 'us';

  /**
   * @property {String} packageName package name
   */
  protected packageName = 'fab__clockpicker';

  /**
   * @property {String} _isShown clockpicker visible
   */
  protected _isShown = false;

  /**
   * @property {String} _currentView current view, can be "hours" or "minutes"
   */
  protected _currentView = 'hours';

  /**
   * @property {HTMLDivElement} $el Clockpicker element
   */
  public $el: HTMLDivElement = document.createElement('div');

  inputRef: Ref<HTMLInputElement> = createRef();

  hoursRef: Ref<HTMLInputElement> = createRef();

  minutesRef: Ref<HTMLInputElement> = createRef();

  hourRef: Ref<HTMLInputElement> = createRef();

  minuteRef: Ref<HTMLInputElement> = createRef();

  amRef: Ref<HTMLInputElement> = createRef();

  pmRef: Ref<HTMLInputElement> = createRef();

  clockpickerRef: Ref<HTMLDivElement> = createRef();

  iconRef: Ref<HTMLDivElement> = createRef();

  handRef: Ref<HTMLDivElement> = createRef();

  get clockpickerHTML() {
    return html`
      <div ${ref(this.clockpickerRef)} class="${this.packageName}">
        <div class="${this.packageName}__header">${this.headerHTML}</div>
        <div class="${this.packageName}__body">
          ${this.handHTML} ${this.hoursHTML} ${this.minutesHTML}
        </div>
        <div class="${this.packageName}__footer">
          <button @click=${this.clear}>Clear</button>
          <button @click=${this.setValue}>Now</button>
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

  get headerHTML() {
    return html`
      <button ${ref(this.hourRef)} @click=${this._showHours}>
        ${this.currentHour}
      </button>
      <span>:</span>
      <button ${ref(this.minuteRef)} @click=${this._showMinutes}>
        ${this.currentMinutes}
      </button>
      ${this.locale === 'us'
        ? html`<button ${ref(this.amRef)}>AM</button>
            <button ${ref(this.pmRef)}>PM</button>`
        : ''}
    `;
  }

  get iconHTML() {
    // eslint-disable-next-line lit-a11y/click-events-have-key-events
    return html` <div
      class="${this.packageName}__icon ${this.prependIcon
        ? 'prepend'
        : 'append'}"
      @click=${this.showClockpicker}
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
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
    ];

    const hours = this.locale === 'us' ? USHours : FRHours;

    const data = hours.map(
      hour =>
        html`<div data-hour="${hour}" class="${this.packageName}__hour">
          ${hour}
        </div>`
    );

    return html`<div
      ${ref(this.hoursRef)}
      class="${this.packageName}__hours show"
    >
      ${data}
    </div>`;
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

    const data = minutes.map(
      minute =>
        html`<div data-minute="${minute}" class="${this.packageName}__minute">
          ${minute}
        </div>`
    );

    return html`<div
      ${ref(this.minutesRef)}
      class="${this.packageName}__minutes"
    >
      ${data}
    </div>`;
  }

  get handHTML() {
    return html`
      <div ${ref(this.handRef)} class="${this.packageName}__canvas">
        <svg class="${this.packageName}__svg" width="200" height="200">
          <g transform="translate(100,100)">
            <line x1="0" y1="0" x2="-54" y2="9.91963907309356e-15"></line>
            <circle
              class="${this.packageName}__canvas-fg"
              r="3.5"
              cx="-54"
              cy="9.91963907309356e-15"
            ></circle>
            <circle
              class="${this.packageName}__canvas-bg"
              r="13"
              cx="-54"
              cy="9.91963907309356e-15"
            ></circle>
            <circle
              class="${this.packageName}__canvas-bearing"
              cx="0"
              cy="0"
              r="2"
            ></circle>
          </g>
        </svg>
      </div>
    `;
  }

  get $input() {
    return this.inputRef.value;
  }

  get $hours() {
    return this.hoursRef.value;
  }

  get $minutes() {
    return this.minutesRef.value;
  }

  get $hour() {
    return this.hourRef.value;
  }

  get $minute() {
    return this.minuteRef.value;
  }

  get $am() {
    return this.amRef.value;
  }

  get $pb() {
    return this.pmRef.value;
  }

  get $clockpicker() {
    return this.clockpickerRef.value;
  }

  get $hand() {
    return this.handRef.value;
  }

  get now() {
    const date = new Date();

    return date.toLocaleTimeString([], { timeStyle: 'short' });
  }

  setValue(event?: MouseEvent, val?: string) {
    // eslint-disable-next-line no-param-reassign
    if (!val) val = this.now;

    this.value = val;
    this.$input?.setAttribute('value', val);

    if (this.autoClose) this.hideClockpicker(event, true);
  }

  clear(event?: MouseEvent) {
    this.value = '';
    this.$input?.setAttribute('value', '');

    if (this.autoClose) this.hideClockpicker(event, true);
  }

  showClockpicker() {
    this._setActiveTime();
    this.$clockpicker?.classList.add('show');
    this._isShown = true;
  }

  hideClockpicker(event?: Event, force = false) {
    if (!this._isShown) return;
    if (event && event.target) {
      if (event.target instanceof FabClockpicker && !force) {
        return;
      }
    }
    this.$clockpicker?.classList.remove('show');
    this._isShown = false;
  }

  render() {
    return html`
      <div class="${this.packageName}__container">
        <div class="${this.packageName}__container__input">
          ${this.position === 'top' ? this.clockpickerHTML : ''}
          <input
            @focus=${this.showClockpicker}
            ${ref(this.inputRef)}
            @change=${console.log}
            type="text"
            class="${this.inputClass}"
            autocomplete="off"
            .value="${this.value}"
            name="${this.name}"
          />
          ${this.icon ? this.iconHTML : ''}
        </div>
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

    const ticks = this.shadowRoot?.querySelectorAll(
      `.${this.packageName}__hour, .${this.packageName}__minute`
      // eslint-disable-next-line no-undef
    ) as NodeListOf<HTMLDivElement>;

    ticks?.forEach((tick, i) => {
      const radian = (i / 6) * Math.PI;
      const inner = i > 0 && i < 13;
      const innerRadius = 54;
      const outerRadius = 80;
      const radius = inner ? innerRadius : outerRadius;
      const tickRadius = 13;
      const dialRadius = 100;

      tick.style.left = `${
        dialRadius + Math.sin(radian) * radius - tickRadius
      }px`;
      tick.style.top = `${
        dialRadius - Math.cos(radian) * radius - tickRadius
      }px`;
      if (inner) {
        tick.style.fontSize = '120%';
      }
    });

    this._setActiveTime();

    this._selectHour = this._selectHour.bind(this);
    this._selectMinute = this._selectMinute.bind(this);
    this._showHours = this._showHours.bind(this);
    this._showMinutes = this._showMinutes.bind(this);

    this._initHandler();
  }

  private _selectHour(event: Event) {
    if (event.target instanceof HTMLElement) {
      if (this?.$hour) {
        this.$hour.innerHTML = event.target.innerText;
      }
    }

    this._setActiveTime();
    this._showMinutes();
  }

  private _selectMinute(event: Event) {
    if (event.target instanceof HTMLElement) {
      if (this?.$minute) {
        this.$minute.innerHTML = event.target.innerText;
      }
    }

    if (this.autoClose) {
      this._done(event);
    }
  }

  private _setHand(x: number, y: number, roundBy5: boolean, draggin: boolean) {

  }

  private _setActiveTime() {
    this.$hours
      ?.querySelector(`.${this.packageName}__hour.active`)
      ?.classList.remove('active');
    this.$hours
      ?.querySelector(`.${this.packageName}__minute.active`)
      ?.classList.remove('active');

    if (this.value) {
      const hour = this.value.split(':')[0];
      const minute = this.value.split(':')[1];

      this.$hours
        ?.querySelector(`[data-hour="${hour}"]`)
        ?.classList.add('active');
      this.$minutes
        ?.querySelector(`[data-minute="${minute}"]`)
        ?.classList.add('active');
    } else {
      this.$hours
      ?.querySelector(`[data-hour="00"]`)
      ?.classList.add('active');
    this.$minutes
      ?.querySelector(`[data-minute="00"]`)
      ?.classList.add('active');
    }
  }

  private _showHours() {
    this.$hours?.classList.add('show');
    this.$minutes?.classList.remove('show');
    this._currentView = 'hours';
  }

  private _showMinutes() {
    this.$hours?.classList.remove('show');
    this.$minutes?.classList.add('show');
    this._currentView = 'minutes';
  }

  private _done(event: Event) {
    this.hideClockpicker(event, true);
    this._showHours();
    this.value = `${this.$hour?.innerText}:${this.$minute?.innerText}`;
    this.$input?.setAttribute(
      'value',
      `${this.$hour?.innerText}:${this.$minute?.innerText}`
    );
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

    this.shadowRoot
      ?.querySelectorAll(`.${this.packageName}__hour`)
      .forEach(el => {
        el.addEventListener('click', this._selectHour);
      });

    this.shadowRoot
      ?.querySelectorAll(`.${this.packageName}__minute`)
      .forEach(el => {
        el.addEventListener('click', this._selectMinute);
      });
  }

  destroy() {
    this.remove();
  }

  static styles = css`
    :host {
      --fab-clockpicker-primary: #646cff;
      --fab-clockpicker-primary-darken: #474dcc;
      --fab-clockpicker-primary-lighten: #575ee7;
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

    .fab__clockpicker__container__input {
      position: relative;
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: min-content;
      position: absolute;
      bottom: 0;
      height: 100%;
    }

    .fab__clockpicker__icon.prepend {
      left: 5px;
      top: 0;
    }

    .fab__clockpicker__input:has(+ .prepend) {
      padding-left: 35px;
    }

    .fab__clockpicker__icon.append {
      right: 5px;
      top: 0;
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
      padding: 0.2rem;
    }

    .fab__clockpicker .fab__clockpicker__header,
    .fab__clockpicker .fab__clockpicker__body,
    .fab__clockpicker .fab__clockpicker__footer {
      width: 100%;
    }

    .fab__clockpicker .fab__clockpicker__header button {
      color: var(--fab-clockpicker-primary);
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

    .fab__clockpicker .fab__clockpicker__canvas {
      width: 200px;
      height: 200px;
      position: absolute;
    }
    .fab__clockpicker .fab__clockpicker__canvas line {
      stroke: #0095dd;
      stroke-width: 1;
      stroke-linecap: round;
    }

    .fab__clockpicker .fab__clockpicker__canvas-fg,
    .fab__clockpicker .fab__clockpicker__canvas-bearing {
      stroke: none;
      fill: var(--fab-clockpicker-primary);
    }
    .fab__clockpicker .fab__clockpicker__canvas-bg {
      stroke: none;
      fill: var(--fab-clockpicker-primary-lighten);
    }

    .fab__clockpicker .fab__clockpicker__body {
      background-color: #f1f1f1;
      height: 200px;
      width: 200px;
      padding: 1rem;
    }

    .fab__clockpicker .fab__clockpicker__body .fab__clockpicker__hours,
    .fab__clockpicker .fab__clockpicker__body .fab__clockpicker__minutes {
      display: none;
      position: relative;
    }

    .fab__clockpicker .fab__clockpicker__body .fab__clockpicker__hours.show,
    .fab__clockpicker .fab__clockpicker__body .fab__clockpicker__minutes.show {
      display: block;
    }

    .fab__clockpicker .fab__clockpicker__body .fab__clockpicker__hour,
    .fab__clockpicker .fab__clockpicker__body .fab__clockpicker__minute {
      position: absolute;
      border-radius: 50%;
      color: #666;
      line-height: 26px;
      text-align: center;
      width: 26px;
      height: 26px;
      cursor: pointer;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .fab__clockpicker .fab__clockpicker__hour.active,
    .fab__clockpicker .fab__clockpicker__minute.active {
      background-color: var(--fab-clockpicker-primary-darken);
      color: #1a1a1a;
    }

    .fab__clockpicker .fab__clockpicker__hour:hover,
    .fab__clockpicker .fab__clockpicker__minute:hover {
      background-color: var(--fab-clockpicker-primary);
      color: #1a1a1a;
    }

    .fab__clockpicker .fab__clockpicker__footer {
      display: flex;
    }

    .fab__clockpicker .fab__clockpicker__footer button {
      min-width: 33%;
      color: var(--fab-clockpicker-primary);
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #f9f9f9;
      cursor: pointer;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    .fab__clockpicker .fab__clockpicker__footer button:hover {
      background-color: var(--fab-clockpicker-primary);
      color: #f9f9f9;
    }
    .fab__clockpicker button:focus,
    .fab__clockpicker button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: dark) {
      .fab__clockpicker .fab__clockpicker__header {
        background-color: #1a1a1a;
        color: var(--fab-clockpicker-primary);
      }

      .fab__clockpicker .fab__clockpicker__header button:hover {
        background-color: #363636;
      }

      .fab__clockpicker .fab__clockpicker__body {
        background-color: #363636;
        color: #cacaca;
      }

      .fab__clockpicker .fab__clockpicker__footer button {
        background-color: #1a1a1a;
      }
      .fab__clockpicker .fab__clockpicker__footer button:hover {
        color: #1a1a1a;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'fab-clockpicker': FabClockpicker;
  }
}
