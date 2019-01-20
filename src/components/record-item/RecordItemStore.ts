import { autobind } from "core-decorators";
import { Store } from "@app/stores";
import { AppContext } from "@context";
import { observable } from "mobx";
import { ICommentItem } from "@components/comment-item";
import { get } from "lodash";

@autobind
export class RecordItemStore extends Store {
    @observable private _comments: ICommentItem[] = [];

    get comments(): ICommentItem[] {
        return this._comments;
    }

    set comments(value: ICommentItem[]) {
        this._comments = value;
    }

    getComments(diaryId: string, recordId: string): void {
        this.transport.getLimitedComments(diaryId, recordId).then((response) => {
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
