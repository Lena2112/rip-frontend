import { InputFieldStore } from "../input-field/InputFieldStore";

export class PasswordFieldStore extends InputFieldStore {
    private readonly passwordMinLength = 6;

    isPasswordValid(): boolean {
        if (!this.value) {
            return false;
        }
        return this.value.length >= this.passwordMinLength;
    }
}
