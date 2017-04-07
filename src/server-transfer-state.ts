import {Injectable, RendererFactory2, ViewEncapsulation} from '@angular/core';
import {PlatformState} from '@angular/platform-server';
import {TransferState} from './transfer-state';

@Injectable()
export class ServerTransferState extends TransferState {
    constructor(private state: PlatformState, private rendererFactory: RendererFactory2) {
        super();
    }

    removeExtra(): void {
        try {
            const document: any = this.state.getDocument();
            const renderer = this.rendererFactory.createRenderer(document, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });

            const html: any = Array.from(document.children).find((child: any) => child.name === 'html');
            const body: any = Array.from(html.children).find((child: any) => child.name === 'body');
            const content: any = Array.from(body.children).find((child: any) => child.name === 'content');
            const main: any = Array.from(content.children).find((child: any) => child.name === 'main');

            const outlet: any = Array.from(main.children).find((child: any) => child.name === 'router-outlet');
            const ngComponent: any = Array.from(main.children).find((child: any) => child.name === 'ng-component');

            renderer.removeChild(main, outlet);
            renderer.removeAttribute(ngComponent, "ng-version");
            renderer.removeAttribute(content, "ng-version");
        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Only used for debug
     */
    transfertState(): void {
        try {
            const document: any = this.state.getDocument();
            const transferStateString = JSON.stringify(this.toJson());
            const renderer = this.rendererFactory.createRenderer(document, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });

            const html: any = Array.from(document.children).find((child: any) => child.name === 'html');
            const head = Array.from(html.children).find((child: any) => child.name === 'head');

            if (!head)
                throw new Error('<head> not found in the document');

            const script = renderer.createElement('script');
            renderer.setValue(script, `window['TRANSFER_STATE'] = ${transferStateString}`);
            renderer.appendChild(head, script);
        } catch (e) {
            console.error(e);
        }
    }

    inject(): void {
        try {
            /*
             * use this.transfertState(); for debug auto refresh DOM
             */
            this.removeExtra();
        } catch (e) {
            console.error(e);
        }
    }
}
