import * as React from "react";
import { IConfirmationCodeProps } from "./IConfirmationCodeProps";
import { Popup } from "../popups/popup/Popup";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Button } from "../button";
import { InputField } from "../input-field";
import { ConfirmationCodeStore } from "./ConfirmationCodeStore";
import "./ConfirmCode.scss";
import { EFormTypes } from "@config/EFormTypes";

@autobind
@observer
export class ConfirmationCode extends React.Component<IConfirmationCodeProps> {
        private readonly store = new ConfirmationCodeStore();

        sendConfirmationsCode(): void {
            const code = this.store.getFieldByType(EFormTypes.CONFIRMATION_CODE).getValue();
            this.store.sendConfirmationCode(this.props.login, code);
        }

        render() {
            return (
                <Popup
                    title={this.props.title}
                    description={this.props.description}
                >
                    <InputField
                        addField={this.store.addField}
                        formType={EFormTypes.CONFIRMATION_CODE}
                        placeholder={"Confirmation code"}
                        isReadonly={false}
                        isRequired={true}
                        isClear={this.store.isClearField}
                        className={"confirmation-code_field"}
                        onChange={this.store.onChange}
                    />
                    <Button title={"Подтвердить"} isDisable={!this.store.isCodeValid()} onClick={this.sendConfirmationsCode} />
                    <div className={"confirmation-code__footer"}>
                        {this.props.children}
                        <span className={"confirmation-code__footer_text"} onClick={this.props.confirmLater}>Подтвердить позже</span>
                    </div>
                </Popup>
            );
        }
}
