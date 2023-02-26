import { LitElement } from 'lit';
export declare class FabDialog extends LitElement {
    show: boolean;
    colorPrimary: string;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'fab-dialog': FabDialog;
    }
}
