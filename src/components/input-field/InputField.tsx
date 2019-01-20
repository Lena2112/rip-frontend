import * as React from "react";
import { IInputFieldProps } from "./IInputFieldProps";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { InputFieldStore } from "./InputFieldStore";
import { InputFieldView } from "../input-field-view";
import { Field } from "../field/Field";
import * as uuid from "uuid";
import { IInputField } from "../field/IInputField";
import { Transport } from "@services/transport";
import { EFieldTypes } from "@config/EFieldTypes";

@observer
@autobind
export class InputField extends React.Component<IInputFieldProps> {
    protected readonly initField: IInputField = {
        id: uuid.v4().toString(),
        type: this.props.formType,
        value: "",
        error: "",
        isValid: false,
    };
    protected readonly field = new Field(this.initField);
    protected readonly store = new InputFieldStore();
    protected readonly transport = new Transport();

    // tslint:disable-next-line:no-null-keyword
    getSnapshotBeforeUpdate(prevProps: Readonly<IInputFieldProps>): null {
        const isPropChanged = this.props.value !== prevProps.value;
        if (isPropChanged && this.props.value) {
            this.field.setValue(this.props.value);
        }
        // tslint:disable-next-line:no-null-keyword
        return null;
    }

    componentDidMount(): void {
        this.props.addField(this.field);
        if (!this.props.value) {
            return;
        }
        this.field.setValue(this.props.value);
        if (this.props.value !== "") {
            this.store.isFocused = true;
        }

        if (!this.props.getId) {
            return;
        }
        this.props.getId(this.initField.id);
    }

    componentDidUpdate(): void {
        if (this.field.getValue() === "") {
            this.field.reset();
        }
        if (!this.props.error) {
            return;
        }
        this.field.setError(this.props.error);
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.value = event.target.value;
        this.field.setValue(event.target.value);
        this.props.onChange(this.field.getId(), this.field.getValue());
        this.store.value === "" ? this.store.isFocused = false : this.store.isFocused = true;
    }

    onFocus(): void {
        this.store.isFocused = true;
        if (this.props.onFocus) {
            this.props.onFocus();
        }
        this.field.removeError();
        if (this.field.getValue() !== "") {
            return;
        }
        this.store.isClear = false;

    }

    onBlur(): void {
        if (this.field.getValue() === "") {
            this.store.isFocused = false;
        }
        if (!this.props.onBlur) {
            return;
        }
        this.props.onBlur();
    }

    render() {
        return(
            <InputFieldView
                type={EFieldTypes.TEXT}
                placeholder={this.props.placeholder}
                isReadonly={this.props.isReadonly}
                isRequired={this.props.isRequired}
                isClear={this.store.isClear}
                className={this.props.className}
                maxLength={this.store.maxLength}
                value={this.field.getValue()}
                error={this.field.getError()}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onChange={this.onChange}
                isFocused={this.store.isFocused}
            />
        );
    }
}
