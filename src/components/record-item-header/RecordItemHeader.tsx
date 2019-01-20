import * as React from "react";
import { SFC } from "react";
import { IRecordItemHeaderProps } from "@components/record-item-header/IRecordItemHeaderProps";
import { SmallAvatar } from "@components/small-avatar";
import { formatDate } from "@helpers/helpers";
import "./RecordItemHeader.scss";

export const RecordItemHeader: SFC<IRecordItemHeaderProps> = (({
    created, diaryName, diaryLogo, updated
}) => {
    return(
        <div className="record-item-header-wrapper">
            <div className="record-item-header">
                <SmallAvatar src={diaryLogo} alt={diaryLogo} type={"logo"} size={"middle"} />
                <div className="record-item-header_content">
                    <div className="record-item-header_name">{diaryName}</div>
                    {updated ?
                        <div className="record-item-header_line">{formatDate(updated)} (изменено)</div> :
                        <div className="record-item-header_line">{formatDate(created)}</div>
                    }
                </div>
            </div>
        </div>
    );
});
