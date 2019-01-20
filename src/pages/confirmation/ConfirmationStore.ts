import { autobind } from "core-decorators";
import { Transport } from "@services/transport";
import { observable } from "mobx";
import { last, dropRight, get } from "lodash";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";

@autobind
export class ConfirmationStore {
    @observable private _message = "";
    @observable private _success = false;
    private readonly transport = new Transport();

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    confirmUser(): void {
        const url = window.location.pathname;
        let splittedUrl = url.split("/");
        const activationCode = last(splittedUrl);
        splittedUrl = dropRight(splittedUrl);
        const login = last(splittedUrl);
        if (!login || !activationCode) {
            return;
        }
        this.transport.confirmCode(login, activationCode).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._success = true;
                this._message = "E-mail успешно подвержден!";
            } else {
                this._success = false;
                this._message = "Ссылка недействительна!";
            }
        });
    }

    goToLogin(): void {
        AppContext.getHistory().push(EAppPaths.LOGIN);
    }

    goToMain(): void {
        AppContext.getHistory().push(EAppPaths.MAIN);
    }
}
