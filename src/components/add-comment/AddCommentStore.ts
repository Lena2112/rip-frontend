import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class AddCommentStore {
    @observable private _commentText = "";

    get commentText(): string {
        return this._commentText;
    }

    set commentText(value: string) {
        this._commentText = value;
    }
}
