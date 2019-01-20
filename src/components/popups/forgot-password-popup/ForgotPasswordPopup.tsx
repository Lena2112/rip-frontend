import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Popup } from "@components/popups/popup/";
import { EmailField } from "../../email-field/index";
import { EFormTypes } from "../../../config/EFormTypes";
import { ForgotPasswordPopupStore } from "./ForgotPasswordPopupStore";
import { Button } from "../../button/index";
import { PushNotification } from "../../push-notification/index";

@autobind
@observer
export class ForgotPasswordPopup extends Popup {
    private readonly store = new ForgotPasswordPopupStore();

    componentDidUpdate(): void {
        if (this.props.isHidden!) {
            this.store.resetFields();
        }
    }

    render() {
        return(
            <>
                <Popup
                    title={this.props.title}
                    description={"Введите e-mail учетной записи и мы отправим Вам новый пароль"}
                    isHidden={this.props.isHidden || this.store.isPopupHidden}
                >
                    <EmailField
                        addField={this.store.addField}
                        formType={EFormTypes.EMAIL}
                        placeholder={"E-mail"}
                        isReadonly={false}
                        isRequired={true}
                        isClear={this.store.isClearField}
                        onChange={this.store.onChange}
                        className={"full-width change-item"}
                    />
                    <Button
                        title={"Отправить пароль"}
                        isDisable={!this.store.isFormValid()}
                        onClick={this.store.sendPassword}
                    />
                    {this.props.children}
                </Popup>
                <PushNotification
                    title={"Пароль успешно отправлен"}
                    isHidden={this.store.isPushHidden}
                    onClick={this.store.closePushNotification}
                />
            </>
        );
    }
}
