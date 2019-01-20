import * as React from "react";
import { ReactNode } from "react";
import "./ShortLogo.scss";
import { Link } from "react-router-dom";
import { EAppPaths } from "@config/EAppPaths";
import { IShortLogoProps } from "./IShortLogoProps";

export class ShortLogo extends React.Component<IShortLogoProps> {
    render(): ReactNode {
        return(
            <Link to={EAppPaths.MAIN} className={"logo"} style={{border: `2px solid ${this.props.color}`}}>
                <span className="logo__text" style={{color: this.props.color}}>D</span>
            </Link>
        );
    }
}
