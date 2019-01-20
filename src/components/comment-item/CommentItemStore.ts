import { TextEditorStore } from "@pages/text-editor-store";
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { Subject } from "rxjs";
import { AppContext } from "@context";
import { get } from "lodash";

@autobind
export class CommentItemStore extends TextEditorStore {
    @observable private _isEdited = false;

    get isEdited(): boolean {
        return this._isEdited;
    }

    set isEdited(value: boolean) {
        this._isEdited = value;
    }

    onEditComment(text: string): void {
        this._isEdited = true;
        this.textEditor = text;
    }

    cancelEdit(): void {
        this._isEdited = false;
    }

    deleteComment(diaryId: string, recordId: string, commentId: string, onUpdate$: Subject<void>): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.deleteComment(token, diaryId, recordId, commentId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                onUpdate$.next();
            }
        });
    }

    saveEditedComment(diaryId: string, recordId: string, commentId: string, onUpdate$: Subject<void>): void {
        const token = AppContext.getUserStore().getToken();
        const text = this.textEditor;
        this.transport.editComment(token, diaryId, recordId, commentId, text).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                onUpdate$.next();
                this._isEdited = false;
            }
        });
    }
}
