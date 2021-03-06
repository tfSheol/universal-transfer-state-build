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
    ServerTransferState.prototype.test = function (renderer, style, name) {
        if (name === 'style') {
            renderer.removeAttribute(style, 'ng-transition');
        }
    };
    ServerTransferState.prototype.removeExtra = function () {
        try {
            var document_1 = this.state.getDocument();
            var renderer_1 = this.rendererFactory.createRenderer(document_1, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            var html = Array.from(document_1.children).find(function (child) { return child.name === 'html'; });
            var body = Array.from(html.children).find(function (child) { return child.name === 'body'; });
            var content = Array.from(body.children).find(function (child) { return child.name === 'content'; });
            var main = Array.from(content.children).find(function (child) { return child.name === 'main'; });
            var head = Array.from(html.children).find(function (child) { return child.name === 'head'; });
            var outlet = Array.from(main.children).find(function (child) { return child.name === 'router-outlet'; });
            var ngComponent = Array.from(main.children).find(function (child) { return child.name === 'ng-component'; });
            Array.from(head.children).forEach(function (child) {
                if (child.name === 'style') {
                    renderer_1.removeAttribute(child, 'ng-transition');
                }
            });
            renderer_1.removeChild(main, outlet);
            renderer_1.removeAttribute(ngComponent, 'ng-version');
            renderer_1.removeAttribute(content, 'ng-version');
        }
        catch (e) {
            console.error(e);
        }
    };
    ServerTransferState.prototype.transfertState = function () {
        try {
            var document_2 = this.state.getDocument();
            var transferStateString = JSON.stringify(this.toJson());
            var renderer = this.rendererFactory.createRenderer(document_2, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            var html = Array.from(document_2.children).find(function (child) { return child.name === 'html'; });
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
    ServerTransferState.prototype.inject = function () {
        try {
            this.removeExtra();
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
