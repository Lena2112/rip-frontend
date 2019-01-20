import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import "./Confirmation.scss";
import { ConfirmationStore } from "./ConfirmationStore";
import { PanelContainer } from "@components/panel-container";
import { Button } from "@components/button";

@observer
@autobind
export class Confirmation extends React.Component {
    private readonly store = new ConfirmationStore();

    componentDidMount(): void {
        this.store.confirmUser();
    }

    render(): React.ReactNode {
        return (
            <div className="confirmation-wrapper">
                <PanelContainer title={"Подтверждение аккаунта"}>
                    <div className={`confirmation_message confirmation_${this.store.success ? "success" : "failure"}`}>
                        {this.store.message}
                    </div>
                    {this.store.success ?
                        <Button
                            title={"Перейти на вход"}
                            isDisable={false}
                            onClick={this.store.goToLogin}
                            className={"confirmation_button"}
                        /> :
                        <Button
                            title={"Перейти на главную"}
                            isDisable={false}
                            onClick={this.store.goToMain}
                            className={"confirmation_button"}
                        />
                    }
                </PanelContainer>
            </div>
        );
    }
}
