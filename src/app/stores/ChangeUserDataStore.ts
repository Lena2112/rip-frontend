import { FormStore } from "@components/form-store";
import { observable } from "mobx";
import { autobind } from "core-decorators";

@autobind
export class ChangeUserDataStore extends FormStore {
    private static readonly delay = 5200;
    @observable protected _fieldId = "";
    @observable protected _isNotificationShown = false;

    get fieldId(): string {
        return this._fieldId;
    }

    setFieldId(id: string): void {
        this._fieldId = id;
    }

    get isNotificationShown(): boolean {
        return this._isNotificationShown;
    }

    set isNotificationShown(value: boolean) {
        this._isNotificationShown = value;
    }

    hideNotification(): void {
        this._isNotificationShown = false;
    }

    showNotification(): void {
        this._isNotificationShown = true;
        window.setTimeout(() => {
            this._isNotificationShown = false;
        }, ChangeUserDataStore.delay);
    }
}
