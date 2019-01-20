import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class PushNotificationStore {
    @observable private _isHidden = true;
    @observable private _class = "";

    get isHidden(): boolean {
        return this._isHidden;
    }

    set isHidden(value: boolean) {
        this._isHidden = value;
    }

    get class(): string {
        return this._class;
    }

    set class(value: string) {
        this._class = value;
    }

}
