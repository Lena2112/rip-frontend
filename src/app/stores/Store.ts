import { Transport } from "@services/transport";
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { Subject } from "rxjs";
import { Socket } from "@services/socket";

@autobind
export class Store {
    protected readonly transport = new Transport();
    private readonly socket = new Socket();
    @observable private _isPopupShown = false;
    @observable private _isLoaded = false;
    @observable private readonly _onUpdate$ = new Subject<void>();
    @observable private _preloaderText = "";
    @observable private _isSuccessPopupShown = false;

    get isPopupShown(): boolean {
        return this._isPopupShown;
    }

    set isPopupShown(value: boolean) {
        this._isPopupShown = value;
    }

    get isLoaded(): boolean {
        return this._isLoaded;
    }

    set isLoaded(value: boolean) {
        this._isLoaded = value;
    }

    get onUpdate$(): Subject<void> {
        return this._onUpdate$;
    }

    get preloaderText(): string {
        return this._preloaderText;
    }

    set preloaderText(value: string) {
        this._preloaderText = value;
    }

    get isSuccessPopupShown(): boolean {
        return this._isSuccessPopupShown;
    }

    set isSuccessPopupShown(value: boolean) {
        this._isSuccessPopupShown = value;
    }

    hideSuccessPopup(): void {
        this._isSuccessPopupShown = false;
    }

    getSocketConnection(): void {
        this.socket.connect();
    }
}
