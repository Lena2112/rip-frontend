import * as React from "react";
import { IDiaryPreviewSmallProps } from "./IDiaryPreviewSmallProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import "./DiaryPreviewSmall.scss";
import { Button } from "@components/button";

const defaultDiary = require("./img/default-diary-image.png");

export const DiaryPreviewSmall = observer<SFC<IDiaryPreviewSmallProps>>(({
    data, onDeleteDiary, onEditDiary, onAddRecord
}) => {
    return (
        <div className="diary-preview-small">
            <div className="diary-preview-small_item">
                <img
                    src={data.logo ? data.logo : defaultDiary}
                    alt={name}
                    onError={onLogoLoadError}
                    className={"full-width"}
                />
            </div>
            <div className="diary-preview-small_item">{data.name}</div>
            <div className="diary-preview-small_item">
                <Button
                    title={"Добавить запись"}
                    isDisable={false}
                    onClick={() => onAddRecord(data.diaryId)}
                    className={"diary-preview-small_button"}
                />
            </div>
            <div className="diary-preview-small_item">
                <Button
                    title={"Редактировать"}
                    isDisable={false}
                    onClick={() => onEditDiary(data.diaryId, data.name)}
                    className={"diary-preview-small_button"}
                />
            </div>
            <div className="diary-preview-small_item">
                <Button
                    title={"Удалить"}
                    isDisable={false}
                    onClick={() => onDeleteDiary(data.diaryId, data.name)}
                    className={"diary-preview-small_button"}
                />
            </div>
        </div>
    );
});

function onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
    const target = event.target as HTMLImageElement;
    if (!target) {
        return;
    }
    target.setAttribute("src", defaultDiary);
}
