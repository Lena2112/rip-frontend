import * as React from "react";
import { observer } from "mobx-react";
import { SFC } from "react";
import { IDiaryItemProps } from "@components/diary-item/IDiaryItemProps";
import { formatDate } from "@helpers/helpers";
import { Link } from "react-router-dom";
import "./DiaryItem.scss";
import { SmallAvatar } from "@components/small-avatar";

const defaultDiary = require("./img/default-diary-image.png");

export const DiaryItem = observer<SFC<IDiaryItemProps>>(({
    data
}) => {
    return(
        <div className="diary-item">
            <div className="diary-item_half">
                <img src={data.logo || defaultDiary} className="diary-item_logo"/>
            </div>
            <div className="diary-item_half">
                <div className="diary-item_content">
                    <div className="diary-item_content_top">
                        <div className="diary-item_content_top_left">
                            <SmallAvatar src={data.avatar} alt={data.name} type={"avatar"} size={"middle"}/>
                        </div>
                        <div className="diary-item_content_top_right">
                            <div className="diary-item_author">{data.author}</div>
                            <div className="diary-item_date">Дата регистрации: {formatDate(data.created)}</div>
                        </div>
                    </div>
                    <div className="diary-item_content_middle">
                        <div className="diary-item_header">
                            <Link to={`/diary/${data.author}/${data.id}`} className="diary-item_link">{data.name}</Link>
                        </div>
                        <div className="diary-item_description" dangerouslySetInnerHTML={{__html: data.description}} />
                    </div>
                    <div className="diary-item_content_bottom">
                        <div>Записей: {data.quantityRecords}</div>
                        &nbsp;
                        <div>Комментариев: {data.quantityComments}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});
