import { autobind } from "core-decorators";
import { IChangeLogin } from "@interfaces/";
import { get } from "lodash";
import { AppContext } from "@context";
import { observable } from "mobx";
import { ChangeUserDataStore } from "@app/stores";
import { EFormTypes } from "@config/EFormTypes";

@autobind
export class ChangeLoginStore extends ChangeUserDataStore {
    @observable private _textFieldId = "";

    get textFieldId(): string {
        return this._textFieldId;
    }

    setTextFieldId(id: string): void {
        this._textFieldId = id;
    }

    changeLogin(): void {
        const data: IChangeLogin = this.getFormValues<IChangeLogin>();
        const login = get(data, "login");
        const token = AppContext.getUserStore().getToken();
        if (this.isFormValid()) {
            this.transport.changeLogin(token, login).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    this.getFieldByType(EFormTypes.LOGIN).setIsValid(false);
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    AppContext.getStore().onUpdate$.next();
                    this.isPopupShown = true;
                }
            });
        }

    }
}
