import { LitElement } from 'lit';
export declare class FabDialog extends LitElement {
    visible: boolean;
    movable: boolean;
    reducible: boolean;
    expandable: boolean;
    closable: boolean;
    colorPrimary: string;
    fullscreen: boolean;
    resizable: boolean;
    private _disX;
    private _disY;
    $el: HTMLDivElement;
    isFullScreen: boolean;
    isFocused: boolean;
    isReduced: boolean;
    name: string;
    selector: {
        el: string;
        header: string;
        title: string;
        icons: string;
        reduce: string;
        expand: string;
        close: string;
        body: string;
        footer: string;
        dragging: string;
    };
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    firstUpdated(): void;
    /**
     * Dispatch a custom event preceded by 'fabmodal:'
     *
     * @param {string} eventName Custom event name to dispatch
     */
    private _dispatchFabModalEvent;
    /**
     * Toggle reduce
     */
    toggleReduce(): Promise<void>;
    /**
     * Focus dialog with z-index
     */
    setFocused(): void;
    /**
     * Apply blink effet , usefull if some dialog opened
     */
    blink(): void;
    /**
     * Init drag moving dialog event
     */
    private _initDrag;
    /**
     * Init handler
     */
    private _initHandler;
    /**
     * init event on mouse down
     * @ignore
     */
    private _fnDown;
    /**
     * Move dialog during moving
     * @ignore
     */
    private _fnMove;
    /**
     * remove drag mouse event
     * @ignore
     */
    private _fnUp;
    /**
     * toggle fullscreen dialog
     * @returns {Promise<boolean>}
     */
    toggleFullscreen(): Promise<boolean>;
    /**
     * Show dialog if is hidden
     */
    show(): void;
    /**
     * Toggle visiblity of dialog
     */
    toggle(): void;
    /**
     * Hide dialog if is visible
     */
    hide(): void;
    /**
     * Remove dialog from DOM
     */
    destroy(): void;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'fab-dialog': FabDialog;
    }
}
