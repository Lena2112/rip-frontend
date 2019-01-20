import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IDishCategory } from "@interfaces/";
import { Store } from "@app/stores";
import { get } from "lodash";

@autobind
export class MenuStore extends Store {
    @observable private _menuList: IDishCategory[] = [];

    get menuList(): IDishCategory[] {
        return this._menuList;
    }

    set menuList(value: IDishCategory[]) {
        this._menuList = value;
    }

    getCurrentCategory(current: string): string {
        return current.slice(1);
    }

    getCategories(): void {
        this.transport.getCategories().then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._menuList = get(response.data, "data");
            }
        });
    }
}
