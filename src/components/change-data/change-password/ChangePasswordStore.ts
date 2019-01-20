import { autobind } from "core-decorators";
import { IChangePassword } from "@interfaces/";
import { get } from "lodash";
import { observable } from "mobx";
import { ChangeUserDataStore } from "@app/stores";
import { AppContext } from "@context";

@autobind
export class ChangePasswordStore extends ChangeUserDataStore {
    @observable private _textFieldId = "";

    get textFieldId(): string {
        return this._textFieldId;
    }

    setTextFieldId(id: string): void {
        this._textFieldId = id;
    }

    changePassword(): void {
        const data: IChangePassword = this.getFormValues<IChangePassword>();
        const token = AppContext.getUserStore().getToken();
        data.token = token;
        if (this.isFormValid()) {
            this.transport.changePassword(data).then((response) => {
               const success =  get(response.data, "success");
               if (!success) {
                   const error = get(response.data, "error");
                   this.setServerError(error);
               } else {
                   this.onUpdate$.next();
                   this.isPopupShown = true;
               }
            });
        }

    }
}
