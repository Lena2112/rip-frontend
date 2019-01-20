import * as React from "react";
import { observer } from "mobx-react";
import "./Registration.scss";
import { RegistrationStore } from "./RegistrationStore";
import { autobind } from "core-decorators";
import { InputField } from "@components/input-field";
import { EFormTypes } from "@config/EFormTypes";
import { EmailField } from "@components/email-field";
import { PasswordField } from "@components/password-field";
import { Button } from "@components/button";
import { Link } from "react-router-dom";
import { EAppPaths } from "@config/EAppPaths";
import { PanelContainer } from "@components/panel-container";
import { InfoPopup } from "@components/popups/info-popup";

@observer
@autobind
export class Registration extends React.Component {
    private readonly store = new RegistrationStore();

    render() {
        return(
            <PanelContainer title={"Регистрация"}>
                <InputField
                    addField={this.store.addField}
                    formType={EFormTypes.LOGIN}
                    placeholder={"Логин"}
                    isReadonly={false}
                    isRequired={true}
                    onBlur={this.store.onBlurLogin}
                    isClear={this.store.isClearField}
                    className={"registration-panel_field"}
                    onChange={this.store.onChange}
                />
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Электронная почта"}
                    isReadonly={false}
                    isRequired={true}
                    onBlur={this.store.onBlurEmail}
                    isClear={this.store.isClearField}
                    className={"registration-panel_field"}
                    onChange={this.store.onChange}
                />
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.PASSWORD}
                    placeholder={"Пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"registration-panel_field"}
                    onChange={this.store.onChange}
                />
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.REPEAT_PASSWORD}
                    placeholder={"Повторите пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"registration-panel_field"}
                    onChange={this.store.onChange}
                />
                <Button
                    title={"Зарегистрироваться"}
                    isDisable={!this.store.isFormValid()}
                    onClick={this.store.register}
                    className={"login-panel_button"}
                />
                <div className="registration-panel_link">
                    Уже зарегистрированы?&nbsp;
                    <Link to={EAppPaths.LOGIN} className="registration-panel_link">Войти</Link>
                </div>
                {this.store.isPopupShown &&
                    <InfoPopup
                        title={"Пользователь успешно зарегистрирован!"}
                        description={this.store.message}
                        onClick={this.store.hidePopup}
                    />
                }
            </PanelContainer>
        );
    }
}
