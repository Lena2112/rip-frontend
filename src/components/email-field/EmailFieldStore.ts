import { InputFieldStore } from "../input-field/InputFieldStore";

export class EmailFieldStore extends InputFieldStore {
    isEmailValid(): boolean {
        const re = /.+@.+\..+/i;
        return re.test(this._value);
    }
}
