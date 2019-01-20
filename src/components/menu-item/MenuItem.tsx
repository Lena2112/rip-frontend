import * as React from "react";
import { SFC } from "react";
import { Link } from "react-router-dom";
import { IMenuItemProps } from "@components/menu-item/IMenuItemProps";
import * as classNames from "classnames";
import "./MenuItem.scss";

export const MenuItem: SFC<IMenuItemProps> = (({title, link, current}) => {
    return (
        <div className={classNames("menu-item", current === link && "menu-item--active")}>
            <Link
                to={link}
                className={"menu-item__link"}
            >
                {title}
            </Link>
        </div>
    );
});
