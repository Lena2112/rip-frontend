import { EFormTypes } from "../../config/EFormTypes";
import { IFormProps } from "../field/IFormProps";

export interface IInputFieldProps extends IFormProps {
    formType: EFormTypes;
    placeholder: string;
    isReadonly: boolean;
    isRequired: boolean;
    isClear: boolean;
    value?: string;
    className?: string;
    error?: string;

    onChange(id: string, text: string): void;

    onFocus?(): void;

    onBlur?(): void;

    getId?(id: string): void;
}
