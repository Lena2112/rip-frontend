import * as React from "react";
import { IInfoPopupProps } from "./IInfoPopupProps";
import { observer } from "mobx-react";
import { Popup } from "../popups/popup/Popup";
import { Button } from "../button";

@observer
export class InfoPopup extends React.Component<IInfoPopupProps> {
    render() {
        return (
            <Popup
                title={this.props.title}
                description={this.props.description}
            >
                <Button title={this.props.buttonTitle} onClick={this.props.onClick} isDisable={false}/>
            </Popup>
        );
    }
}
