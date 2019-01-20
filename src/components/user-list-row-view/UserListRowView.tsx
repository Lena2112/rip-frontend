import * as React from "react";
import { observer } from "mobx-react";
import { SFC } from "react";
import { IUserListRowViewProps } from "./IUserListRowViewProps";
import "./UserListRowView.scss";
import { formatDate } from "@helpers/helpers";

const defaultAvatar = require("./img/default-avatar.jpg");

export const UserListRowView = observer<SFC<IUserListRowViewProps>>(({
    data,
    onClick,
}) => {
    return(
        <div className="user-list-row" onClick={() => onClick(data._id)}>
            <div className="user-list-row__item">
                <div className="user-list-row__item_avatar">
                    <img
                        src={data.avatar || defaultAvatar}
                        alt={data.login}
                        className={"avatar-image"}
                        onError={onLogoLoadError}
                    />
                </div>
            </div>
            <div className="user-list-row__item">
                <span>{data.login}</span>
            </div>
            <div className="user-list-row__item">
                <span>{data.email}</span>
            </div>
            <div className="user-list-row__item">
                <span>{formatDate(data.created)}</span>
            </div>
        </div>
    );
});

function onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
    const target = event.target as HTMLImageElement;
    if (!target) {
        return;
    }
    target.setAttribute("src", defaultAvatar);
}
