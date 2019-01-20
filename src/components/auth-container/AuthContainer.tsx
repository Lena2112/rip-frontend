import * as React from "react";
import { observer } from "mobx-react";
import "./AuthContainer.scss";
import { IAuthContainerProps } from "./IAuthContainerProps";
import { SFC } from "react";

export const AuthContainer = observer<SFC<IAuthContainerProps>>(({
    header,
    children
}) => {
    return(
        <div className={"auth-container"}>
            <div className={"auth-container__header"}>{header}</div>
            <div className={"auth-container__content"}>
                {children}
            </div>
        </div>
    );
});
