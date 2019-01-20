import { IUserListRow } from "@components/user-list-row";
import { observable } from "mobx";
import { Subject } from "rxjs/internal/Subject";
import { Transport } from "@services/transport";
import { get } from "lodash";
import { autobind } from "core-decorators";
import { AppContext } from "@context";

@autobind
export class UserListStore {
    private readonly transport = new Transport();
    @observable private readonly _userList: IUserListRow[] = [];
    @observable private readonly _onUpdate$ = new Subject<void>();
    @observable private _user: IUserListRow = {
        _id: "",
        email: "",
        login: "",
        created: "",
        role: "",
        avatar: "",
        activationCode: "",
        isBlocked: false,
        isDeleted: false
    };
    @observable private _isPopupShown = false;
    @observable private readonly _onUpdateUser$ = new Subject<void>();

    get userList(): IUserListRow[] {
        return this._userList;
    }

    get onUpdate$(): Subject<void> {
        return this._onUpdate$;
    }

    get user(): IUserListRow {
        return this._user;
    }

    set user(user: IUserListRow) {
        this._user = user;
    }

    get isPopupShown(): boolean {
        return this._isPopupShown;
    }

    set isPopupShown(value: boolean) {
        this._isPopupShown = value;
    }

    get onUpdateUser$(): Subject<void> {
        return this._onUpdateUser$;
    }

    get userId(): string {
        return this._user._id;
    }

    set userId(value: string) {
        this._user._id = value;
    }

    addToList(item: IUserListRow): void {
        this._userList.push(item);
    }

    popupSwitch(): void {
        this._isPopupShown = !this._isPopupShown;
    }

    async getUserList() {
       try {
           const token = AppContext.getUserStore().getToken();
           const response = await this.transport.getUsers(token);
           const success = get(response.data, "success");
           if (success) {
               const list = get(response.data, "data");
               list.map((data: IUserListRow) => {
                   this.addToList(data);
               });
           }
       } catch (e) {
           throw new Error(e);
       }
    }

    async getUser() {
        const token = AppContext.getUserStore().getToken();
        const response = await this.transport.getUserById(token, this.user._id);
        const success = get(response.data, "success");
        if (success) {
            this.user = get(response.data, "data");
            this.isPopupShown = true;
        }
    }

    blockUser(id: string): void {
        const token = AppContext.getUserStore().getToken();
        if (!this.user.isBlocked) {
            this.transport.blockUser(token, id).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.onUpdateUser$.next();
                }
            });
        } else {
            this.transport.unblockUser(token, id).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.onUpdateUser$.next();
                }
            });
        }
    }
}
