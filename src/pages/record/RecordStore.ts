import { Store } from "@app/stores";
import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IRecordItem } from "@components/record-item";
import { get, last, dropRight } from "lodash";
import { IDiaryData } from "@pages/diary/IDiaryData";
import { ICommentItem } from "@components/comment-item";
import { AppContext } from "@context";

@autobind
export class RecordStore extends Store {
    @observable private _record: IRecordItem = {
        _id: "",
        diaryId: "",
        name: "",
        text: "",
        created: "",
        updated: ""
    };

    @observable private _diary: IDiaryData = {
        id: "",
        name: "",
        created: "",
        description: "",
        logo: "",
    };
    @observable private _comments: ICommentItem[] = [];
    @observable private _login = "";

    get record(): IRecordItem {
        return this._record;
    }

    set record(value: IRecordItem) {
        this._record = value;
    }

    get diary(): IDiaryData {
        return this._diary;
    }

    set diary(value: IDiaryData) {
        this._diary = value;
    }

    get login(): string {
        return this._login;
    }

    set login(value: string) {
        this._login = value;
    }

    get comments(): ICommentItem[] {
        return this._comments;
    }

    set comments(value: ICommentItem[]) {
        this._comments = value;
    }

    getRecord(): void {
        const url = window.location.pathname;
        let urlArray = url.split("/");
        const recordId = last(urlArray);
        urlArray = dropRight(urlArray);
        const diaryName = last(urlArray);
        if (!recordId || !diaryName) {
            return;
        }
        this.transport.getRecord(diaryName, recordId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const data = get(response.data, "data");
                this._record = get(data, "record");
                this._diary = get(data, "diary");
                this._login = get(data, "login");
            }
        });
    }

    getComments(): void {
        const url = window.location.pathname;
        let urlArray = url.split("/");
        const recordId = last(urlArray);
        urlArray = dropRight(urlArray);
        const diaryName = last(urlArray);
        if (!recordId || !diaryName) {
            return;
        }
        this.transport.getComments(diaryName, recordId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._comments = get(response.data, "data");
            }
        });
    }

    isCommentFormShow(): boolean {
        return AppContext.getUserStore().isLoggedIn;
    }
}
