import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Popup } from "@components/popups/popup/";
import { EFormTypes } from "@config/EFormTypes";
import { DeleteUserPopupStore } from "./DeleteUserPopupStore";
import { PasswordField } from "@components/password-field";
import { Button } from "@components/button";
import { EmailField } from "@components/email-field";
import "./DeleteUserPopup.scss";

@autobind
@observer
export class DeleteUserPopup extends Popup {
    private readonly store = new DeleteUserPopupStore();

    render() {
        return(
            <Popup
                title={this.props.title}
                description={"После удаления учетную запись нельзя будет восстановить. Для подтверждения удаления введите логин и пароль."}
                isHidden={this.props.isHidden}
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
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.PASSWORD}
                    placeholder={"Пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                />
                <Button
                    title={"Удалить пользователя"}
                    isDisable={!this.store.isFormValid()}
                    onClick={this.store.deleteUser}
                />
                {this.props.children}
            </Popup>
        );
    }
}
