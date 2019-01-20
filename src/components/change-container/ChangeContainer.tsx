import * as React from "react";
import { IChangeContainerProps } from "./IChangeContainerProps";
import "./ChangeContainer.scss";
import { Button } from "@components/button";
import { observer } from "mobx-react";
import { SFC } from "react";

export const ChangeContainer = observer<SFC<IChangeContainerProps>>(({
   headerText,
   buttonText,
   isFormValid,
   onClick,
   children
}) => {
    return(
        <div className="change-container">
            <div className="change-container_header">{headerText}</div>
            <div className="change-container_content">
                {children}
                <Button title={buttonText} isDisable={!isFormValid} onClick={onClick} />
            </div>
        </div>
    );
});
