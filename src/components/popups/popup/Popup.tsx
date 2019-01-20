import * as React from "react";
import "./Popup.scss";
import { IPopupProps } from "./IPopupProps";
import { observer } from "mobx-react";

@observer
export class Popup extends React.Component<IPopupProps> {
    render() {
        return (
            <>
                <div className={"overlay-wrapper"} data-hidden={this.props.isHidden!}>
                    <div className={`popup ${this.props.className ? this.props.className : ""}`}>
                        <div className={`popup__header`}>{this.props.title}</div>
                        <div className={"popup__content"}>
                            {this.props.description ? <div className={"popup__content_description"}>{this.props.description}</div> : undefined}
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
