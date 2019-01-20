import { TextEditorStore } from "@pages/text-editor-store";
import { observable } from "mobx";
import { IRecordItem } from "@components/record-item";
import { getId } from "@helpers/helpers";
import { get, last, dropRight } from "lodash";
import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { IEditRecord } from "../../interfaces/IEditRecord";
import { EAppPaths } from "@config/EAppPaths";
import { ServerErrorParser } from "@services/error-parser";

@autobind
export class EditRecordStore extends TextEditorStore {
    @observable private _record: IRecordItem = {
        _id: "",
        diaryId: "",
        name: "",
        text: "",
        created: "",
        updated: ""
    };

    get record(): IRecordItem {
        return this._record;
    }

    set record(value: IRecordItem) {
        this._record = value;
    }

    getRecord(): void {
        const recordId = getId();
        const diaryId = last(dropRight((window.location.pathname.split("/"))));
        if (!diaryId) {
            return;
        }
        this.transport.getEditRecord(diaryId, recordId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._record = get(response.data, "data");
                this.textEditor = this._record.text;
            }
        });
    }

    editRecord(): void {
        if (this.isFormValid() || this.isEditorValid()) {
            this.isLoaded = true;
            const token = AppContext.getUserStore().getToken();
            const fieldData = this.getFormValues();
            const recordName = get(fieldData, "text");
            const data: IEditRecord = {
                token,
                diaryId: this._record.diaryId,
                recordId: this._record._id,
                name: recordName,
                text: this.textEditor
            };
            this.transport.editRecord(data).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.isLoaded = false;
                    this.isSuccessPopupShown = true;
                    this.onUpdate$.next();
                } else {
                    const errorResponse = get(response.data, "error");
                    const error = new ServerErrorParser(errorResponse);
                    if (error.getErrorCode() === 16) {
                        AppContext.getHistory().push(EAppPaths.MAIN);

                    }
                }
            });
        }
    }
}
