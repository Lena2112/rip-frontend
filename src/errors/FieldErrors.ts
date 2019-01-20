import { IFieldError } from "./IFieldError";
import { EFormTypes } from "../config/EFormTypes";

export class FieldErrors {
    private readonly errors: IFieldError[] = [
        {type: EFormTypes.EMAIL, codes: [1, 6, 10, 13]},
        {type: EFormTypes.LOGIN, codes: [2, 9]},
        {type: EFormTypes.PASSWORD, codes: [4, 5, 7, 12, 8]},
        {type: EFormTypes.CONFIRMATION_CODE, codes: [3]},
        {type: EFormTypes.OLD_PASSWORD, codes: [11]},
        {type: EFormTypes.TEXT, codes: []},
    ];

    getTypeByCode(code: number): EFormTypes {
        let type: EFormTypes = EFormTypes.TEXT;
        this.errors.map((data: IFieldError) => {
            if (data.codes.indexOf(code) >= 0) {
                type = data.type;
            }
        });
        return type;
    }
}
