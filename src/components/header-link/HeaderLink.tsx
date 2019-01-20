import * as React from "react";
import { Link } from "react-router-dom";
import "./HeaderLink.scss";
import { IHeaderLinkProps } from "./IHeaderLinkProps";
import * as classNames from "classnames";
import { observer } from "mobx-react";
import { SFC } from "react";

export const HeaderLink = observer<SFC<IHeaderLinkProps>>(({
    path,
    name,
    current
}) => {
    return(
            <Link
              to={path}
              className={classNames(
                  "header-link",
                  path === current && "header-link--active"
              )}
            >
                {name}
            </Link>
        );
});
