import { observer } from "mobx-react";
import * as React from "react";
import { SFC } from "react";
import { IMyArticleItemProps } from "./IMyArticleItemProps";
import "./MyArticleItem.scss";
import { formatDate } from "@helpers/helpers";
import { Button } from "@components/button";

export const MyArticleItem = observer<SFC<IMyArticleItemProps>>(({
    created,
    name,
    articleId,
    onEditArticle,
    onShowPopup
}) => {
    return(
        <div className="my-article-item">
            <div className="my-article_cell">{name}</div>
            <div className="my-article_cell">{formatDate(created)}</div>
            <div className="my-article_cell">
                <Button
                    title={"Редактировать"}
                    isDisable={false}
                    onClick={() => onEditArticle(articleId)}
                    className="button--bordered full-width"
                />
            </div>
            <div className="my-article_cell">
                <Button
                    title={"Удалить"}
                    isDisable={false}
                    onClick={() => onShowPopup(articleId)}
                    className="delete-article"
                />
            </div>
        </div>
    );
});
