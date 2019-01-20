import { observer } from "mobx-react";
import { SFC } from "react";
import { IFieldContainerProps } from "./IFieldContainerProps";
import * as React from "react";
import "./FieldContainer.scss";

export const FieldContainer  = observer<SFC<IFieldContainerProps>>(({
    title, children
}) => {
    return(
        <div className="field-container">
            <div className="field-container_header">{title}</div>
            <div className="field-container_content">{children}</div>
        </div>
    );
});
