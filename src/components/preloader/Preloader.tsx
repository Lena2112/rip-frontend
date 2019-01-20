import * as React from "react";
import { IPreloaderProps } from "./IPreloaderProps";
import "./Preloader.scss";
import { observer } from "mobx-react";
import { SFC } from "react";

export const Preloader = observer<SFC<IPreloaderProps>>(({ title }) => {
    return (
        <div className="preloader-overlay">
            <div className="preloader-wrapper">
                <div className="preloader">
                    <div className="preloader_icon"/>
                    <div className="preloader_title">{title}</div>
                </div>
            </div>
        </div>
    );
});
