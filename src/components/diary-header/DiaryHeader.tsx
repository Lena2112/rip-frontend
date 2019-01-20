import * as React from "react";
import { IDiaryHeaderProps } from "./IDiaryHeaderProps";
import { SFC } from "react";
import "./DiaryHeader.scss";
import { SmallAvatar } from "@components/small-avatar";
import { Link } from "react-router-dom";
import { formatDate } from "@helpers/helpers";
import { observer } from "mobx-react";

export const DiaryHeader = observer<SFC<IDiaryHeaderProps>>(({
    data, dateCreation
}) => {
    return (
        <div className="diary-header">
            <div className="diary-header_item">
                <SmallAvatar src={data.avatar} alt={data.name} type={"avatar"} size={"middle"} />
            </div>
            <div className="diary-header_item">
                <Link to={`/user/${data.id}`} className="diary-header_link">{data.name}</Link>
            </div>
            <div className="diary-header_item">{formatDate(dateCreation)}</div>
        </div>
    );
});
