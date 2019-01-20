import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Subject } from "rxjs/internal/Subject";
import { assign, head, mapValues } from "lodash";
import { Field } from "../field/Field";
import { FieldErrors } from "../../errors/FieldErrors";
import { ServerErrorParser, IServerError } from "@services/error-parser";
import { EFormTypes } from "@config/EFormTypes";
import { Store } from "@app/stores";

@autobind
export class FormStore extends Store {
    @observable protected fields: Field[] = [];
    @observable protected _isClearField = false;
    @observable protected readonly _isConfirmCodeValid$ = new Subject<boolean>();
    @observable protected  _isValidData = false;
    @observable protected currentFormType: EFormTypes;

    protected readonly passwordMinLength = 5;
    protected readonly codeLength = 32;
    protected readonly fieldErrors = new FieldErrors();

    addField(field: Field): void {
        this.fields.push(field);
    }

    getFields(): Field[] {
        return this.fields;
    }

    protected getFormValues<T>(): T {
        const values = {};
        this.fields.map((data: Field) => {
            assign(values, {
                [data.getType()]: data.getValue()
            });
        });

        return values as T;
    }

    protected getFormValuesById<T>(): T {
        const values = {};
        this.fields.map((data: Field) => {
            assign(values, {
                [data.getId()]: data.getValue()
            });
        });

        return values as T;
    }

    getFieldByType(type: EFormTypes): Field {
        const fields = this.fields.filter((data: Field) => {
            return data.getType() === type;
        });
        return head(fields)!;
    }

    getFieldById(id: string): Field {
        const fields = this.fields.filter((data: Field) => {
            return data.getId() === id;
        });
        return head(fields)!;
    }

    onChange(id: string, value: string): void {
        const field = this.getFieldById(id);
        field.setValue(value);
        field.setIsValid(this.getValidationFunction(field.getType()));
    }

    resetFields(): void {
        mapValues(this.fields, (element: Field) => element.reset());
        this.isClearField = true;
    }

    isFormValid(): boolean {
        return this.fields.every((data) => {
            return data.getIsValid();
        });
    }

    makeFieldsInvalid(): void {
        this.fields.map((data) => {
            data.setIsValid(false);
        });
    }

    checkFields(): void {
        this.fields.map((data) => {
           data.setIsValid(this.getValidationFunction(data.getType()));
        });
    }

    hidePopup(): void {
        this.isPopupShown = false;
        this.isClearField = true;
        this.resetFields();
    }

    setServerError(response: IServerError): void {
        const error = new ServerErrorParser(response);
        const code = error.getErrorCode();
        const message = error.getErrorMessage();
        const typeField = this.fieldErrors.getTypeByCode(code);
        const field = this.getFieldByType(typeField);
        if (!field) {
            return;
        }
        field.setError(message);
    }

    get isClearField(): boolean {
        return this._isClearField;
    }

    set isClearField(value: boolean) {
        this._isClearField = value;
    }

    get isConfirmCodeValid$(): Subject<boolean> {
        return this._isConfirmCodeValid$;
    }

    get isValidData(): boolean {
        return this._isValidData;
    }

    set isValidData(value: boolean) {
        this._isValidData = value;
    }

    protected isPasswordValid(): boolean {
        const field: Field = this.getFieldByType(EFormTypes.PASSWORD);
        if (!field) {
            return false;
        }
        return field.getValue().length > this.passwordMinLength;
    }

    protected isOldPasswordValid(): boolean {
        const field: Field = this.getFieldByType(EFormTypes.OLD_PASSWORD);
        if (!field) {
            return false;
        }
        return field.getValue().length > this.passwordMinLength;
    }

    protected isEmailValid(): boolean {
        const field: Field = this.getFieldByType(EFormTypes.EMAIL);
        if (!field) {
            return false;
        }
        const re = /.+@.+\..+/i;
        return re.test(field.getValue());
    }

    protected isTextValid(): boolean {
        const field: Field = this.getFieldByType(EFormTypes.TEXT);
        if (!field) {
            return false;
        }
        return field.getValue() !== "";
    }

    isLoginValid(): boolean {
        const field: Field = this.getFieldByType(EFormTypes.LOGIN);
        if (!field) {
            return false;
        }
        return field.getValue() !== "";
    }

    protected isPasswordsEquals(): boolean {
        const passwordField: Field = this.getFieldByType(EFormTypes.PASSWORD);
        const repeatPasswordField: Field = this.getFieldByType(EFormTypes.REPEAT_PASSWORD);
        if (!passwordField || !repeatPasswordField) {
            return false;
        }
        return passwordField.getValue() === repeatPasswordField.getValue();
    }

    protected isConfirmationCodeValid(): boolean {
        const field: Field = this.getFieldByType(EFormTypes.CONFIRMATION_CODE);
        if (!field) {
            return false;
        }
        return field.getValue().length === this.codeLength;
    }

    private getValidationFunction(type: EFormTypes): boolean {
        const validators = {
            login: this.isLoginValid(),
            text: this.isTextValid(),
            email: this.isEmailValid(),
            oldPassword: this.isOldPasswordValid(),
            password: this.isPasswordValid(),
            repeatPassword: this.isPasswordsEquals(),
            confirmationCode: this.isConfirmationCodeValid(),
        };
        return validators[type];
    }

}
