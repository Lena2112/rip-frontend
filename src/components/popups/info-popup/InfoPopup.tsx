import * as React from "react";
import { IInfoPopupProps } from "./IInfoPopupProps";
import { observer } from "mobx-react";
import { Button } from "@components/button";
import { Popup } from "@components/popups/popup";

@observer
export class InfoPopup extends React.Component<IInfoPopupProps> {
    render() {
        return (
            <Popup
                title={this.props.title}
                description={this.props.description}
            >
                <Button
                    title={this.props.buttonTitle ? this.props.buttonTitle : "Закрыть"}
                    onClick={this.props.onClick}
                    isDisable={false}
                />
            </Popup>
        );
    }
}
