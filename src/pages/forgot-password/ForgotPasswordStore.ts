import { observable } from "mobx";
import { autobind } from "core-decorators";
import { FormStore } from "@components/form-store";
import { IForgotPassword } from "@interfaces/";
import { get } from "lodash";

@autobind
export class ForgotPasswordStore extends FormStore {
    @observable _message = "";

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    sendNewPassword(): void {
        if (this.isFormValid()) {
            const data: IForgotPassword = this.getFormValues<IForgotPassword>();
            this.transport.forgotPassword(data).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    this.resetFields();
                    this._message = "Новый пароль отправлен на ваш e-mail!";
                }
            });
        }
    }
}
