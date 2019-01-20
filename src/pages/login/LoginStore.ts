import { observable } from "mobx";
import { autobind } from "core-decorators";
import { FormStore } from "@components/form-store";
import { IUserDataLogin } from "@interfaces/";
import { EFormTypes } from "@config/EFormTypes";
import { get } from "lodash";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { ServerErrorParser } from "@services/error-parser";

@autobind
export class LoginStore extends FormStore {
    private static readonly notConfirmedCode = 8;
    @observable private _login = "";
    @observable private _isCodeResended = false;

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get isCodeResended(): boolean {
        return this._isCodeResended;
    }

    set isCodeResended(value: boolean) {
        this._isCodeResended = value;
    }

    isValidInputData(): boolean {
        return this.isEmailValid() && this.isPasswordValid();
    }

    loginUser(): void {
        if (this.isFormValid()) {
            const data: IUserDataLogin = this.getFormValues<IUserDataLogin>();
            this.transport.login(data).then((res) => {
                const success = get(res.data, "success");
                const message = get(res.data, "data");
                if (success) {
                    AppContext.getUserStore().setToken(message);
                    AppContext.getUserStore().login();
                    AppContext.getHistory().push(EAppPaths.PROFILE);
                } else {
                    const serverError = get(res.data, "error");
                    this.setServerError(serverError);
                    const error = new ServerErrorParser(serverError);
                    if (error.getErrorCode() === LoginStore.notConfirmedCode) {
                        const login = get(res.data, "login");
                        this.login = login;
                        this.isPopupShown = true;
                    }
                }
            });
        }
    }

    resendCode(): void {
        const email = this.getFieldByType(EFormTypes.EMAIL).getValue();
        this.transport.resendCode(email).then(() => {
            this.isPopupShown = false;
            this._isCodeResended = true;
        });
    }

    closeNotification(): void {
        this._isCodeResended = false;
    }

    hidePopup(): void {
        this.isPopupShown = false;
    }

}
