import { FormStore } from "../../form-store/index";
import { autobind } from "core-decorators";
import { IForgotPassword } from "@interfaces/";
import { get } from "lodash";
import { observable } from "mobx";

@autobind
export class ForgotPasswordPopupStore extends FormStore {
    private static readonly delay = 5200;
    @observable private _isPushHidden = true;

    get isPushHidden(): boolean {
        return this._isPushHidden;
    }

    set isPushHidden(value: boolean) {
        this._isPushHidden = value;
    }

    @observable private _isPopupHidden = false;

    get isPopupHidden(): boolean {
        return this._isPopupHidden;
    }

    set isPopupHidden(value: boolean) {
        this._isPopupHidden = value;
    }

    closePushNotification(): void {
        this.isPushHidden = true;
    }

    async sendPassword() {
        if (this.isFormValid()) {
            const data: IForgotPassword = this.getFormValues<IForgotPassword>();
            this.transport.forgotPassword(data).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    this.resetFields();
                    this.isPopupHidden = true;
                    this.isPushHidden = false;
                    window.setTimeout(() => {
                        this.isPushHidden = true;
                    }, ForgotPasswordPopupStore.delay);
                }
            });
        }
    }
}
