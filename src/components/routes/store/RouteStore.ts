import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { get } from "lodash";

@autobind
export class RouteStore {
    private readonly transport = new Transport();
    @observable private _success = false;
    @observable private _name = "";

    get success(): boolean {
        return this._success;
    }

    get name(): any {
        return this._name;
    }

    getUser(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.getUser(token).then((response) => {
            const success = get(response.data, "success");
            this._success = true;
            this._name = success ? get(response.data, "data.login") : "";
        });
    }
}
