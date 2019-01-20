import { FormStore } from "../../form-store/index";
import { autobind } from "core-decorators";
import { IDeleteUser } from "@interfaces/";
import { get } from "lodash";
// import { observable } from "mobx";
import { AppContext } from "@context";

@autobind
export class DeleteUserPopupStore extends FormStore {

    async deleteUser() {
        if (this.isFormValid()) {
            const data: IDeleteUser = this.getFormValues<IDeleteUser>();
            const token = AppContext.getUserStore().getToken();
            data.token = token;
            this.transport.deleteUser(data).then((response) => {
                const success = get(response.data, "success");
                if (!success) {
                    const error = get(response.data, "error");
                    this.setServerError(error);
                } else {
                    AppContext.getUserStore().logout();
                }
            });
        }
    }
}
