import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import "../ChangeData.scss";
import { InputField } from "@components/input-field";
import { EFormTypes } from "@config/EFormTypes";
import { ChangeEmailStore } from "./ChangeEmailStore";
import { ChangeContainer } from "@components/change-container";
import { IChangeEmailProps } from "./IChangeEmailProps";
import { PushNotification } from "@components/push-notification";
import { EmailField } from "@components/email-field";
import { AppContext } from "@context";
import { InfoPopup } from "@components/popups/info-popup";

@autobind
@observer
export class ChangeEmail extends React.Component<IChangeEmailProps> {
    private readonly store = new ChangeEmailStore();

    componentDidMount() {
        const id = this.store.textFieldId;
        this.store.getFieldById(id).setIsValid(true);
        AppContext.getFormStore().isConfirmCodeValid$.subscribe(this.store.onUpdateEmailSuccess);
        this.store.onUpdate$.subscribe(this.store.showNotification);
    }

    componentDidUpdate() {
        const id = this.store.textFieldId;
        this.store.getFieldById(id).setIsValid(true);
        this.store.getFieldById(id).setValue(this.props.currentEmail);
    }

    render() {
        return(
            <ChangeContainer
                headerText={"Изменить e-mail"}
                buttonText={"Изменить e-mail"}
                isFormValid={this.store.isFormValid()}
                onClick={this.store.changeEmail}
            >
                <InputField
                    addField={this.store.addField}
                    formType={EFormTypes.TEXT}
                    placeholder={"Текущий e-mail"}
                    isReadonly={true}
                    isRequired={false}
                    isClear={false}
                    value={this.props.currentEmail}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                    getId={this.store.setTextFieldId}
                />
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Новый e-mail"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                />
                <PushNotification
                    title={"E-mail изменен!"}
                    onClick={this.store.hideNotification}
                    isHidden={!this.store.isNotificationShown}
                />
                {this.store.isPopupShown &&
                    <>
                        <InfoPopup
                            title={"Для завершения смены е-mail подтвердите новый e-mail"}
                            description={`${this.store.getLogin()}, на ваш новый e-mail <${this.store.newEmail}> отправлено письмо подтверждения.
                                    Не подтвердив новый e-mail вы не сможете пользоваться учетной записью! Нажав на "Закрыть", вы будет разлогинены!`}
                            onClick={AppContext.getUserStore().logout}
                        />
                    </>
                }
            </ChangeContainer>
        );
    }
}
