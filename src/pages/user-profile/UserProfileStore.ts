import { autobind } from "core-decorators";
import { get, last } from "lodash";
import { observable } from "mobx";
import { IUserProfile } from "./IUserProfile";
import { Transport } from "@services/transport";
import { IInformationCardChildren } from "@components/information-card";
import { formatDate } from "@helpers/helpers";

@autobind
export class UserProfileStore {
    private readonly initUserProfile: IUserProfile = {
        login: "",
        created: "",
        avatar: "",
        articles: []
    };
    @observable private _shortInfo: IInformationCardChildren[] = [];
    @observable private _userProfile: IUserProfile = this.initUserProfile;
    private readonly transport = new Transport();

    get userProfile(): IUserProfile {
        return this._userProfile;
    }

    set userProfile(value: IUserProfile) {
        this._userProfile = value;
    }

    get shortInfo(): IInformationCardChildren[] {
        return this._shortInfo;
    }

    getUserProfile(): void {
        const url = window.location.pathname;
        const userId = last(url.split("/"));
        if (!userId) {
            return;
        }
        this.transport.getUserProfile(userId).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this._userProfile = get(response.data, "data");
               this._shortInfo = [
                   {
                       title: "Логин",
                       message: this._userProfile.login
                   },
                   {
                       title: "Дата регистрации",
                       message: formatDate(this._userProfile.created)
                   },
               ];
           }
        });
    }
}
