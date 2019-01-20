import { IDiariesListProps } from "./IDiariesListProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import * as React from "react";
import { DiaryItem, IDiaryItem } from "@components/diary-item";
import { reversedList } from "@helpers/helpers";

export const DiariesList = observer<SFC<IDiariesListProps>>(({
    data
}) => {
    return(
        <>
            {reversedList(data).map((item: IDiaryItem) => {
                return(
                    <DiaryItem key={item.id} data={item}/>
                );
            })}
        </>
    );
});
