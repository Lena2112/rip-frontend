import { EFormTypes } from "../../config/EFormTypes";
import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IInputField } from "./IInputField";

@autobind
export class Field  {
    @observable private readonly field: IInputField;

    constructor(field: IInputField) {
        this.field = field;
    }

    getField(): IInputField {
        return this.field;
    }

    setValue(value: string): void {
        this.field.value = value;
    }

    getValue(): string {
        return this.field.value;
    }

    setError(value: string): void {
        this.field.error = value;
        this.setIsValid(false);
    }

    getError(): string {
        return this.field.error;
    }

    removeError(): void {
        this.field.error = "";
    }

    setIsValid(value: boolean): void {
        this.field.isValid = value;
    }

    getIsValid(): boolean {
        return this.field.isValid;
    }

    getType(): EFormTypes {
        return this.field.type;
    }

    getId(): string {
        return this.field.id;
    }

    reset(): void {
        this.setError("");
        this.setValue("");
        this.setIsValid(false);
    }

}
