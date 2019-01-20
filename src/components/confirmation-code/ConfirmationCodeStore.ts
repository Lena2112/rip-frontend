import { autobind } from "core-decorators";
import { FormStore } from "@components/form-store";
import { get } from "lodash";
import { AppContext } from "@context";

@autobind
export class ConfirmationCodeStore extends FormStore {

    isCodeValid(): boolean {
        return this.isConfirmationCodeValid();
    }

    sendConfirmationCode(login: string, code: string): void {
        this.transport.confirmCode(login, code).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                AppContext.getFormStore().isConfirmCodeValid$.next();
            } else {
                const error = get(response.data, "error");
                this.setServerError(error);
            }
        });
    }
}
