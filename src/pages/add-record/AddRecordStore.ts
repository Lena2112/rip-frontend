import { autobind } from "core-decorators";
import { observable } from "mobx";
import { last, get } from "lodash";
import { AppContext } from "@context";
import { IAddRecordShortData } from "./IAddRecordShortData";
import { EAppPaths } from "@config/EAppPaths";
import { TextEditorStore } from "@pages/text-editor-store";

@autobind
export class AddRecordStore extends TextEditorStore {
    @observable private readonly _shortData: IAddRecordShortData = {
        nextPosition: 0,
        diaryName: ""
    };

    get shortData(): IAddRecordShortData {
        return this._shortData;
    }

    getShortData(): void {
        const url = window.location.pathname;
        const diaryId = last(url.split("/"));
        if (!diaryId) {
            return;
        }
        const token = AppContext.getUserStore().getToken();
        this.transport.getNumberOfDiary(diaryId, token).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const data = get(response.data, "data");
                this._shortData.diaryName = get(data, "name");
                this._shortData.nextPosition = get(data, "nextPosition");
            } else {
                AppContext.getHistory().push(EAppPaths.MAIN);
            }
        });
    }

    addRecord(): void {
        if (this.isFormValid() || this.isEditorValid()) {
            const url = window.location.pathname;
            const diaryId = last(url.split("/"));
            if (!diaryId) {
                return;
            }
            const token = AppContext.getUserStore().getToken();
            const fieldData = this.getFormValues();
            const nameRecord = get(fieldData, "text");
            this.isLoaded = true;
            this.transport.addRecord(token, diaryId, nameRecord, this.textEditor)
                .then((response) => {
                    const success = get(response.data, "success");
                    if (success) {
                        this.textEditor = "";
                        this.isLoaded = false;
                        this.isPopupShown = true;
                        this.onUpdate$.next();
                    } else {
                        this.isLoaded = false;
                        const error = get(response.data, "error");
                        this.setServerError(error);
                    }
                });
        }
    }
}
