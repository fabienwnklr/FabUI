import { LitElement } from 'lit';
export declare class FabDialog extends LitElement {
    visible: boolean;
    movable: boolean;
    reducible: boolean;
    expandable: boolean;
    closable: boolean;
    colorPrimary: string;
    render(): import("lit-html").TemplateResult<1>;
    private _dispatchFabModalEvent;
    reduce(): void;
    toggleExpand(): void;
    show(): void;
    toggle(): void;
    hide(): void;
    destroy(): void;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'fab-dialog': FabDialog;
    }
}
