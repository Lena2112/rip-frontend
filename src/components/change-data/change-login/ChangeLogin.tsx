import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import "../ChangeData.scss";
import { InputField } from "@components/input-field";
import { EFormTypes } from "@config/EFormTypes";
import { ChangeLoginStore } from "./ChangeLoginStore";
import { ChangeContainer } from "@components/change-container";
import { IChangeLoginProps } from "./IChangeLoginProps";
import { InfoPopup } from "@components/popups/info-popup";

@autobind
@observer
export class ChangeLogin extends React.Component<IChangeLoginProps> {
    private readonly store = new ChangeLoginStore();

    componentDidMount() {
        const id = this.store.fieldId;
        this.store.getFieldById(id).setIsValid(true);
    }

    componentDidUpdate() {
        const id = this.store.fieldId;
        this.store.getFieldById(id).setIsValid(true);
        this.store.getFieldById(id).setValue(this.props.currentLogin);
        this.store.onUpdate$.subscribe(this.store.showNotification);
    }

    render() {
        return(
            <ChangeContainer
                headerText={"Изменить логин"}
                buttonText={"Изменить логин"}
                isFormValid={this.store.isFormValid()}
                onClick={this.store.changeLogin}
            >
                <InputField
                    addField={this.store.addField}
                    formType={EFormTypes.TEXT}
                    placeholder={"Текущий логин"}
                    isReadonly={true}
                    isRequired={false}
                    isClear={false}
                    value={this.props.currentLogin}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                    getId={this.store.setFieldId}
                />
                <InputField
                    addField={this.store.addField}
                    formType={EFormTypes.LOGIN}
                    placeholder={"Новый логин"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={this.store.isClearField}
                    onChange={this.store.onChange}
                    className={"full-width change-item"}
                />
                {this.store.isPopupShown &&
                    <InfoPopup title={"Логин изменен!"} onClick={this.store.hidePopup} />
                }
            </ChangeContainer>
        );
    }
}
