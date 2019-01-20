import { observable } from "mobx";
import { autobind } from "core-decorators";
import { IResponseUser } from "@interfaces/";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { Transport } from "@services/transport";
import { get } from "lodash";

@autobind
export class UserStore {
    private static readonly nameToken = "token";
    private readonly transport = new Transport();
    @observable private _isLoggedIn = false;
    @observable private _user: IResponseUser = {
        _id: "",
        login: "",
        email: "",
        avatar: "",
        created: "",
    };
    @observable private _error = "";

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

    get error(): string {
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }

    getToken(): string {
        const token = localStorage.getItem(UserStore.nameToken);
        if (!token) {
            return "";
        }
        return token;
    }

    setToken(token: string): void {
        localStorage.setItem(UserStore.nameToken, token);
    }

    getUserId(): string {
        return this._user._id;
    }

    login() {
        const token = this.getToken();
        this.transport.getUser(token).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const user = get(response.data, "data");
                this.user = user;
                this.isLoggedIn = true;
            }
        });
    }

    logout(): void {
        this.removeToken();
        this.isLoggedIn = false;
        this.resetUser();
        AppContext.getHistory().push(EAppPaths.MAIN);
    }

    get user(): IResponseUser {
        return this._user;
    }

    set user(value: IResponseUser) {
        this._user = value;
    }

    resetUser(): void {
        this.user = {
            _id: "",
            login: "",
            email: "",
            avatar: "",
            created: "",
        };
    }

    private removeToken(): void {
        localStorage.removeItem(UserStore.nameToken);
    }
}
