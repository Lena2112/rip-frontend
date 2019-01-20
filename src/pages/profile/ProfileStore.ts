import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { IResponseUser } from "@interfaces/";
import { observable } from "mobx";
import { get } from "lodash";
import { EAppPaths } from "@config/EAppPaths";
import { Store } from "@app/stores";

@autobind
export class ProfileStore extends Store {
    @observable private _user: IResponseUser = AppContext.getUserStore().user;

    get user(): IResponseUser {
        return this._user;
    }

    set user(user: IResponseUser) {
        this._user = user;
    }

    getUser(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.getUser(token).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this.user = get(response.data, "data");
               AppContext.getUserStore().user = get(response.data, "data");
           }
        });
    }

    goToCreationArticle(): void {
        AppContext.getHistory().push(EAppPaths.CREATE_ARTICLE);
    }

    goToMyArticles(): void {
        AppContext.getHistory().push(EAppPaths.MY_ARTICLES);
    }
}
