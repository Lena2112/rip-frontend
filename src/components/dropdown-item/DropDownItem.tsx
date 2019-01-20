import * as React from "react";
import { IDropDownItemProps } from "./IDropDownItemProps";
import { observer } from "mobx-react";
import { SFC } from "react";
import "./DropDownItem.scss";

export const DropDownItem = observer<SFC<IDropDownItemProps>>((
    {
        className,
        item,
        isActive
    }) => {
        return(
            <div className={`dropdown-item ${!className ? "" : className} ${isActive ? "dropdown-item--active" : ""}`} onClick={item.handler}>
                {item.text}
            </div>
        );
});
