import * as React from "react";
import { IConfirmPopupProps } from "./IConfirmPopupProps";
import { Popup } from "../popup/Popup";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Button } from "../../button/index";
import "./ConfirmPopup.scss";

@autobind
@observer
export class ConfirmPopup extends React.Component<IConfirmPopupProps> {
        render() {
            return (
                <Popup
                    title={this.props.title}
                    description={this.props.description}
                >
                    <div className={"confirm-popup"}>
                        <Button
                            title={"Нет"}
                            isDisable={false}
                            onClick={this.props.onCancel}
                            className={"button-confirm-popup"}
                        />
                        <Button
                            title={"Да"}
                            isDisable={false}
                            onClick={this.props.onSubmit}
                            className={"button-confirm-popup"}
                        />
                    </div>
                </Popup>
            );
        }
}
