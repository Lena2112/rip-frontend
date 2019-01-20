import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { get } from "lodash";
import { IDiaryItem } from "@components/diary-item";

@autobind
export class MainStore {
    private readonly transport = new Transport();
    @observable private _diaries: IDiaryItem[] = [];

    get diaries(): IDiaryItem[] {
        return this._diaries;
    }

    set diaries(articles: IDiaryItem[]) {
        this._diaries = articles;
    }

    getDiaries(): void {
        this.transport.getAllDiaries().then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._diaries = get(response.data, "data");
            }
        });
    }

}
