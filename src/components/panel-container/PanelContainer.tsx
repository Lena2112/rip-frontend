import * as React from "react";
import { SFC } from "react";
import { IPanelContainer } from "./IPanelContainer";
import { Logo } from "@components/logo";
import "./PanelContainer.scss";

export const PanelContainer: SFC<IPanelContainer> = (({
    title, children
}) => {
    return(
        <div className="panel-wrapper">
            <div className="panel-container">
                <Logo />
                <h2 className="panel-container_title">{title}</h2>
                {children}
            </div>
        </div>
    );
});
