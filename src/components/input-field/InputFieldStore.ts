import { observable } from "mobx";

export class InputFieldStore {
    @observable protected _value: string;

    @observable protected _isFocused = false;

    @observable protected _error = "";

    @observable protected _isClear = true;

    protected readonly _maxlength = 64;

    set value(value: string) {
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    set isFocused(value: boolean) {
        this._isFocused = value;
    }

    get isFocused(): boolean {
        return this._isFocused;
    }

    get maxLength(): number {
        return this._maxlength;
    }

    set error(value: string) {
        this._error = value;
    }

    get error(): string {
        return this._error;
    }

    isEmpty(): boolean {
        return this._value === "";
    }

    set isClear(value: boolean) {
        this._isClear = value;
    }

    get isClear(): boolean {
        return this._isClear;
    }
}
