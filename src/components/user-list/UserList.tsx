import * as React from "react";
import { observer } from "mobx-react";
import { UserListStore } from "./UserListStore";
import { IUserListRow, UserListRow } from "@components/user-list-row";
import "./UserList.scss";
import { UserInfoPopup } from "@components/popups/full-info-user-popup/";
import { autobind } from "core-decorators";

@observer
@autobind
export class UserList extends React.Component {
    private readonly store = new UserListStore();

    componentDidMount(): void {
        this.store.getUserList();
        this.store.onUpdateUser$.subscribe(this.store.getUser);
    }

    render() {
        return(
            <>
                <h2>Список пользователей</h2>
                <div className="tabs">
                    <div className="tabs_item">Аватар</div>
                    <div className="tabs_item">Логин</div>
                    <div className="tabs_item">E-mail</div>
                    <div className="tabs_item">Дата регистрации</div>
                </div>
                <div className="user-list">
                    {this.store.userList.map((data: IUserListRow) => {
                        return(
                            <UserListRow
                                key={data._id}
                                data={data}
                                onUpdate$={this.store.onUpdate$}
                                onClick={this.showUser}
                            />
                        );
                    })}
                    {this.store.isPopupShown &&
                    <UserInfoPopup
                        title={`Информация о ${this.store.user.login}`}
                        data={this.store.user}
                        onClose={this.store.popupSwitch}
                        blockUser={this.store.blockUser}
                        onUpdateUser$={this.store.onUpdateUser$}
                    />
                    }
                </div>
            </>
        );
    }

    private showUser(userId: string): void {
        this.store.userId = userId;
        this.store.onUpdateUser$.next();
    }
}
