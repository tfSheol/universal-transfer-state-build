import * as tslib_1 from "tslib";
import { Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { PlatformState } from '@angular/platform-server';
import { TransferState } from './transfer-state';
var ServerTransferState = (function (_super) {
    tslib_1.__extends(ServerTransferState, _super);
    function ServerTransferState(state, rendererFactory) {
        var _this = _super.call(this) || this;
        _this.state = state;
        _this.rendererFactory = rendererFactory;
        return _this;
    }
    ServerTransferState.prototype.inject = function () {
        try {
            var document_1 = this.state.getDocument();
            var transferStateString = JSON.stringify(this.toJson());
            var renderer = this.rendererFactory.createRenderer(document_1, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            var html = Array.from(document_1.children).find(function (child) { return child.name === 'html'; });
            var head = Array.from(html.children).find(function (child) { return child.name === 'head'; });
            if (!head)
                throw new Error('<head> not found in the document');
            var script = renderer.createElement('script');
            renderer.setValue(script, "window['TRANSFER_STATE'] = " + transferStateString);
            renderer.appendChild(head, script);
        }
        catch (e) {
            console.error(e);
        }
    };
    return ServerTransferState;
}(TransferState));
export { ServerTransferState };
ServerTransferState.decorators = [
    { type: Injectable },
];
ServerTransferState.ctorParameters = function () { return [
    { type: PlatformState, },
    { type: RendererFactory2, },
]; };
