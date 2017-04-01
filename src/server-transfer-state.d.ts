import { RendererFactory2 } from '@angular/core';
import { PlatformState } from '@angular/platform-server';
import { TransferState } from './transfer-state';
export declare class ServerTransferState extends TransferState {
    private state;
    private rendererFactory;
    constructor(state: PlatformState, rendererFactory: RendererFactory2);
    inject(): void;
}
