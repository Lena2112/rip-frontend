import { observable } from "mobx";
import { autobind } from "core-decorators";
import { FormStore } from "@components/form-store";
import { IUserDataSignUp } from "@interfaces/";
import { EFormTypes } from "@config/EFormTypes";
import { get } from "lodash";

export type TFlagCheckEmail = "reg" | "login";

@autobind
export class RegistrationStore extends FormStore {
    @observable private _message = "";

    get message(): string {
        return this._message;
    }

    set responseMEssage(value: string) {
        this._message = value;
    }

    register(): void {
        if (this.isFormValid()) {
            const data: IUserDataSignUp = this.getFormValues<IUserDataSignUp>();
            this.transport.sendUserData(data).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.isPopupShown = true;
                    this._message = "На ваш e-mail Отправлено письмо для подтверждения аккаунта.";
                }
            });
        }
    }

    async onBlurLogin() {
        const login = this.getFieldByType(EFormTypes.LOGIN);
        const response = await this.transport.checkLoginExist(login.getValue(), "reg");
        const success = get(response.data, "success");
        if (!success) {
            const error = get(response.data, "error");
            this.setServerError(error);
        }
    }

    async onBlurEmail() {
        const email = this.getFieldByType(EFormTypes.EMAIL);
        const response = await this.transport.checkEmailExist(email.getValue(), "reg");
        const success = get(response.data, "success");
        if (!success) {
            const error = get(response.data, "error");
            this.setServerError(error);
        }
    }

    isPasswordsEquals(): boolean {
        const password = this.getFieldByType(EFormTypes.PASSWORD).getValue();
        const repeatPassword = this.getFieldByType(EFormTypes.REPEAT_PASSWORD).getValue();
        return password === repeatPassword;
    }

}
