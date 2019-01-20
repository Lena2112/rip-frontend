import * as React from "react";
import { ISmallAvatarProps } from "./ISmallAvatarProps";
import "./SmallAvatar.scss";
import { autobind } from "core-decorators";
import * as classNames from "classnames";

const defaultAvatar = require("./img/default-avatar.png");
const defaultLogo = require("./img/default-diary-image.png");

@autobind
export class SmallAvatar extends React.Component<ISmallAvatarProps> {
    render(): React.ReactNode {
        return (
            <img
                src={this.props.src ? this.props.src : this.getDefaultImage()}
                alt={this.props.alt}
                onError={this.onLogoLoadError}
                className={classNames(
                    this.props.size === "small" && "small-avatar",
                    this.props.size === "middle" && "middle-avatar",
                )}
            />
        );
    }

    private getDefaultImage() {
        const type = this.props.type;
        return type === "avatar" ? defaultAvatar : type === "logo" && defaultLogo;
    }

    private onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
            return;
        }
        target.setAttribute("src", this.getDefaultImage());
    }
}
