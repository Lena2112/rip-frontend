import * as React from "react";
import { Popup } from "@components/popups/popup";
import { IUserInfoPopupProps } from "./IUserInfoPopupProps";
import "./UserInfoPopup.scss";
import { ReactNode } from "react";
import { UserInfoPopupStore } from "./UserInfoPopupStore";
import { Button } from "@components/button";
import { formatDate, getTranslateRoleName } from "@helpers/helpers";
import { DropDown } from "@components/dropdown";

const defaultAvatar = require("./default-avatar.jpg");

export class UserInfoPopup extends React.Component<IUserInfoPopupProps> {
    private readonly store = new UserInfoPopupStore(this.props);

    protected getView(): ReactNode {
        const buttonText = this.props.data.isBlocked ? "Разблокировать" : "Заблокировать";
        return(
            <Popup title={this.props.title} className={"popup-size"}>
                <div className="user-popup">
                    <div className="user-popup__header">
                        <div className="user-popup__right">
                            <img
                                src={this.props.data.avatar || defaultAvatar}
                                alt={this.props.data.login}
                                onError={this.onLogoLoadError}
                            />
                            {this.props.data.role !== "admin" &&
                                <Button title={buttonText} onClick={() => this.props.blockUser(this.props.data._id)} isDisable={false}/>
                            }
                        </div>
                        <div className={"user-popup__header__content"}>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">Логин: </div>
                                <div className="user-popup_item_half">{this.props.data.login}</div>
                            </div>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">E-mail: </div>
                                <div className="user-popup_item_half">{this.props.data.email}</div>
                            </div>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">Дата регистрации: </div>
                                <div className="user-popup_item_half">{formatDate(this.props.data.created)}</div>
                            </div>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">Роль пользователя: </div>
                                <div className="user-popup_item_half">{this.getDropDownView()}</div>
                            </div>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">Статус пользователя: </div>
                                <div className="user-popup_item_half">{this.store.getActivationsState(this.props.data.activationCode)}</div>
                            </div>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">Заблокирован: </div>
                                <div className="user-popup_item_half">{this.store.getIsBlockedMsg(this.props.data.isBlocked)}</div>
                            </div>
                            <div className="user-popup_item">
                                <div className="user-popup_item_half">Удален: </div>
                                <div className="user-popup_item_half">{this.store.getIsDeleteddMsg(this.props.data.isDeleted)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="user-popup__footer">
                        <div className="user-popup_close" onClick={this.props.onClose}>Закрыть</div>
                    </div>
                </div>
            </Popup>
        );
    }

    render() {
        return this.getView();
    }

    private getDropDownView(): ReactNode {
        const current = getTranslateRoleName(this.props.data.role);
        let node: ReactNode = <>{getTranslateRoleName(this.props.data.role)}</>;
        if (this.props.data.role !== "admin") {
            node = <DropDown items={this.store.getDropdownItems()} current={current} />;
        }
        return node;
    }

    private onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
            return;
        }
        target.setAttribute("src", defaultAvatar);
    }
}
