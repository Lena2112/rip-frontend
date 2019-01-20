import { IResponseUser } from "@interfaces/";
import { observable } from "mobx";
import { autobind } from "core-decorators";

@autobind
export class UserInformation {
    @observable private readonly user: IResponseUser;

    constructor(user: IResponseUser) {
        this.user = user;
    }

    getUser(): IResponseUser {
        return this.user;
    }

    getLogin(): string {
        return this.user.login;
    }
}
