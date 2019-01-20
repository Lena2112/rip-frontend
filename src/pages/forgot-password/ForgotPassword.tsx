import * as React from "react";
import { observer } from "mobx-react";
import "./ForgotPassword.scss";
import { ForgotPasswordStore } from "./ForgotPasswordStore";
import { autobind } from "core-decorators";
import { EFormTypes } from "@config/EFormTypes";
import { EmailField } from "@components/email-field";
import { Button } from "@components/button";
import { Link } from "react-router-dom";
import { EAppPaths } from "@config/EAppPaths";
import { PanelContainer } from "@components/panel-container";

@observer
@autobind
export class ForgotPassword extends React.Component {
    private readonly store = new ForgotPasswordStore();

    render() {
        return(
            <PanelContainer title={"Восстоновление пароля"}>
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Введите ваш e-mail"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"login-panel_field"}
                    onChange={this.store.onChange}
                />
                <Button
                    title={"Отправить новый пароль"}
                    isDisable={!this.store.isFormValid()}
                    onClick={this.store.sendNewPassword}
                    className={"login-panel_button"}
                />
                <div>
                    <Link to={EAppPaths.REGISTRATION} className="registration-panel_link">Зарегистрироваться</Link>
                </div>
                {this.store.message &&
                    <div className="registration-panel_success">
                        {this.store.message}
                    </div>
                }
            </PanelContainer>
        );
    }
}
