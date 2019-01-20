import { Store } from "@app/stores";
import { autobind } from "core-decorators";
import { last, dropRight, get } from "lodash";
import { observable } from "mobx";
import { IDiaryAuthor } from "@pages/diary/IDiaryAuthor";
import { IDiaryData } from "@pages/diary/IDiaryData";
import { IRecordItem } from "@components/record-item";

@autobind
export class DiaryStore extends Store {
    @observable private _diaryId = "";

    @observable private _author: IDiaryAuthor = {
        id: "",
        name: "",
        avatar: ""
    };

    @observable private _diary: IDiaryData = {
        id: "",
        name: "",
        created: "",
        description: "",
        logo: "",
    };

    @observable private _records: IRecordItem[] = [];

    get author(): IDiaryAuthor {
        return this._author;
    }

    set avatar(value: IDiaryAuthor) {
        this._author = value;
    }

    get diary(): IDiaryData {
        return this._diary;
    }

    set diary(value: IDiaryData) {
        this._diary = value;
    }

    get records(): IRecordItem[] {
        return this._records;
    }

    set records(value: IRecordItem[]) {
        this._records = value;
    }

    get diaryId(): string {
        return this._diaryId;
    }

    set diaryId(value: string) {
        this._diaryId = value;
    }

    getRecords(): void {
        const url = window.location.pathname;
        const diaryId = last(url.split("/"));
        if (!diaryId) {
            return;
        }
        this.transport.getRecords(diaryId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._records = get(response.data, "data");
            }
        });
    }

    getDiaryData(): void {
        const url = window.location.pathname;
        let urlArray = url.split("/");
        const diaryId = last(urlArray);
        urlArray = dropRight(urlArray);
        const name = last(urlArray);
        if (!diaryId || !name) {
            return;
        }
        this.transport.getDiaryData(name, diaryId).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               const data = get(response.data, "data");
               this._author = get(data, "author");
               this._diary = get(data, "diary");
           }
        });
    }

    getDiaryId(): void {
        const url = window.location.pathname;
        const diaryId = last(url.split("/"));
        if (!diaryId) {
            return;
        }
        this._diaryId = diaryId;
    }
}
