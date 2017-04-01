export declare class TransferState {
    private _map;
    constructor();
    keys(): any;
    get(key: string): any;
    set(key: string, value: any): Map<string, any>;
    toJson(): any;
    initialize(obj: any): void;
    inject(): void;
}
