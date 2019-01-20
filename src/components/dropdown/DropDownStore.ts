import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class DropDownStore {
    @observable _isOpened = false;

    get isOpened(): boolean {
        return this._isOpened;
    }

    set isOpened(value: boolean) {
        this._isOpened = value;
    }

    switch(): void {
        this._isOpened = !this._isOpened;
    }
}
