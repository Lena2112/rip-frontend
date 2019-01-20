import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { InputField } from "../input-field";
import { PasswordFieldStore } from "./PasswordFieldStore";
import { EPasswordErrors } from "./EPasswordErrors";
import { EFieldTypes } from "../../config/EFieldTypes";
import { InputFieldView } from "../input-field-view";

@observer
@autobind
export class PasswordField extends InputField {
    protected readonly store = new PasswordFieldStore();

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
    }

    onPasswordBlur(): void {
        this.onBlur();
        if (this.store.isPasswordValid()) {
            return;
        }
        this.field.setError(EPasswordErrors.WRONG_PASSWORD);
    }

    render() {
        return(
            <InputFieldView
                type={EFieldTypes.PASSWORD}
                placeholder={this.props.placeholder}
                isReadonly={this.props.isReadonly}
                isRequired={this.props.isRequired}
                isClear={this.props.isClear}
                className={this.props.className}
                maxLength={this.store.maxLength}
                error={this.field.getError()}
                value={this.field.getValue()}
                onBlur={this.onPasswordBlur}
                onFocus={this.onFocus}
                onChange={this.onChange}
                isFocused={this.store.isFocused}
            />
        );
    }
}
