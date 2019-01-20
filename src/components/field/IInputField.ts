import { EFormTypes } from "@config/EFormTypes";

export interface IInputField {
    id: string;
    type: EFormTypes;
    value: string;
    error: string;
    isValid: boolean;
}
