import { autobind } from "core-decorators";
import { IChangeEmail } from "@interfaces/";
import { get } from "lodash";
import { AppContext } from "@context";
import { observable } from "mobx";
import { ChangeUserDataStore } from "@app/stores";
import { EFormTypes } from "@config/EFormTypes";
import { Subject } from "rxjs/internal/Subject";

@autobind
export class ChangeEmailStore extends ChangeUserDataStore {
    @observable private _textFieldId = "";
    @observable private _newEmail = "";
    @observable private readonly _confirmCode$ = new Subject<void>();

    get textFieldId(): string {
        return this._textFieldId;
    }

    setTextFieldId(id: string): void {
        this._textFieldId = id;
    }

    get newEmail(): string {
        return this._newEmail;
    }

    set newEmail(email: string) {
        this._newEmail = email;
    }

    get confirmCode$(): Subject<void> {
        return this._confirmCode$;
    }

    getLogin(): string {
        return AppContext.getUserStore().user.login;
    }

    changeEmail(): void {
        const data: IChangeEmail = this.getFormValues<IChangeEmail>();
        const email = get(data, "email");
        const token = AppContext.getUserStore().getToken();
        if (this.isFormValid()) {
            this.transport.changeEmail(token, email).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    this.getFieldByType(EFormTypes.EMAIL).setIsValid(false);
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    this._newEmail = email;
                    this.isPopupShown = true;
                }
            });
        }
    }

    async onUpdateEmailSuccess() {
        this.isPopupShown = false;
        this.resetFields();
        AppContext.getStore().onUpdate$.next();
    }
}
