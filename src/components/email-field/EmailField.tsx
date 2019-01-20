import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { InputField } from "../input-field";
import { EmailFieldStore } from "./EmailFieldStore";
import { EEmailErrors } from "./EEmailErrors";
import { EFieldTypes } from "../../config/EFieldTypes";
import { InputFieldView } from "../input-field-view";

@observer
@autobind
export class EmailField extends InputField {
    protected readonly store = new EmailFieldStore();

    onEmailBlur(): void {
        this.onBlur();
        if (this.store.isEmailValid()) {
            return;
        }
        this.field.setError(EEmailErrors.WRONG_EMAIL);
    }

    onEmailFocus(): void {
        this.onFocus();
        this.store.error = "";
    }

    render() {
        return(
            <InputFieldView
                type={EFieldTypes.EMAIL}
                placeholder={this.props.placeholder}
                isReadonly={this.props.isReadonly}
                isRequired={this.props.isRequired}
                isClear={this.props.isClear}
                className={this.props.className}
                maxLength={this.store.maxLength}
                error={this.field.getError()}
                value={this.field.getValue()}
                onBlur={this.onEmailBlur}
                onFocus={this.onEmailFocus}
                onChange={this.onChange}
                isFocused={this.store.isFocused}
            />
        );
    }
}
