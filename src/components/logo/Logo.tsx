import * as React from "react";
import { SFC } from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";
import { EAppPaths } from "@config/EAppPaths";

export const Logo: SFC = (({}) => {
    return(
        <Link to={EAppPaths.MAIN} className={"full-logo"} />
    );
});
