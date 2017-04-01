import { NgModule } from '@angular/core';
import { ServerTransferState } from './src/server-transfer-state';
import { TransferHttp } from './src/transfer-http';
import { TransferState } from './src/transfer-state';
export * from './src/server-transfer-state';
export * from './src/transfer-state';
export * from './src/transfer-http';
export function getTransferState() {
    var transferState = new TransferState();
    transferState.initialize(window['TRANSFER_STATE'] || {});
    return transferState;
}
var BrowserTransferStateModule = (function () {
    function BrowserTransferStateModule() {
    }
    return BrowserTransferStateModule;
}());
export { BrowserTransferStateModule };
BrowserTransferStateModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: TransferState,
                        useFactory: (getTransferState)
                    }
                ]
            },] },
];
BrowserTransferStateModule.ctorParameters = function () { return []; };
var ServerTransferStateModule = (function () {
    function ServerTransferStateModule() {
    }
    return ServerTransferStateModule;
}());
export { ServerTransferStateModule };
ServerTransferStateModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: TransferState,
                        useClass: ServerTransferState
                    }
                ]
            },] },
];
ServerTransferStateModule.ctorParameters = function () { return []; };
var TransferHttpModule = (function () {
    function TransferHttpModule() {
    }
    return TransferHttpModule;
}());
export { TransferHttpModule };
TransferHttpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    TransferHttp
                ]
            },] },
];
TransferHttpModule.ctorParameters = function () { return []; };
