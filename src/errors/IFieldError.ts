import { EFormTypes } from "../config/EFormTypes";

export interface IFieldError {
    type: EFormTypes;
    codes: number[];
}
