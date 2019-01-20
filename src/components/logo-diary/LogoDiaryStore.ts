import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Store } from "@app/stores";

@autobind
export class LogoDiaryStore extends Store {
    @observable private _src = "";
    @observable private _error = "";
    @observable private _isValid = false;

    get src(): string {
        return this._src;
    }

    set src(value: string) {
        this._src = value;
    }

    get error(): string {
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }

    get isValid(): boolean {
        return this._isValid;
    }

    set isValid(value: boolean) {
        this._isValid = value;
    }
}
