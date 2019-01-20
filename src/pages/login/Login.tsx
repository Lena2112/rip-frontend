import * as React from "react";
import { observer } from "mobx-react";
import "./Login.scss";
import { LoginStore } from "./LoginStore";
import { autobind } from "core-decorators";
import { EFormTypes } from "@config/EFormTypes";
import { EmailField } from "@components/email-field";
import { PasswordField } from "@components/password-field";
import { Button } from "@components/button";
import { Link } from "react-router-dom";
import { EAppPaths } from "@config/EAppPaths";
import { PanelContainer } from "@components/panel-container";
import { Popup } from "@components/popups/popup";

@observer
@autobind
export class Login extends React.Component {
    private readonly store = new LoginStore();

    render() {
        return(
            <PanelContainer title={"Вход"}>
                <EmailField
                    addField={this.store.addField}
                    formType={EFormTypes.EMAIL}
                    placeholder={"Электронная почта"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"login-panel_field"}
                    onChange={this.store.onChange}
                />
                <PasswordField
                    addField={this.store.addField}
                    formType={EFormTypes.PASSWORD}
                    placeholder={"Пароль"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    className={"login-panel_field"}
                    onChange={this.store.onChange}
                />
                <Button
                    title={"Войти"}
                    isDisable={!this.store.isFormValid()}
                    onClick={this.store.loginUser}
                    className={"login-panel_button"}
                />
                <div>
                    <Link to={EAppPaths.REGISTRATION} className="registration-panel_link">Зарегистрироваться</Link>
                    <Link to={EAppPaths.FORGOT_PASSWORD} className="registration-panel_link">Забыл пароль</Link>
                </div>
                {this.store.isPopupShown &&
                    <Popup
                        title={"Пользоватедь не подтвержден!"}
                        description={"Для использования, подтвердите аккаунт"}
                    >
                        <Button
                            title={"Выслать новое письмо"}
                            isDisable={false}
                            onClick={this.store.resendCode}
                        />
                        <br/>
                        <Button
                            title={"Закрыть"}
                            isDisable={false}
                            onClick={this.store.hidePopup}
                        />
                    </Popup>
                }
            </PanelContainer>
        );
    }
}
