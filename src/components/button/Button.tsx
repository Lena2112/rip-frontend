import * as React from "react";
import "./Button.scss";
import { IButtonProps } from "./IButtonProps";
import * as classNames from "classnames";
import { observer } from "mobx-react";
import { SFC } from "react";

export const Button = observer<SFC<IButtonProps>>((
    {
        title,
        isDisable,
        className,
        onClick
    }) => {
            return(
                <div
                    className={classNames("button", isDisable && "button--disable", className)}
                    onClick={onClick}
                >
                    <span className={"button__text"}>{title}</span>
                </div>
        );
});
