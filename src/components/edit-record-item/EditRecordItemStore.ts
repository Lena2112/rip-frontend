import { Store } from "@app/stores";
import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IDeleteRecord } from "@interfaces/";
import { AppContext } from "@context";
import { get } from "lodash";
import { Subject } from "rxjs";

@autobind
export class EditRecordItemStore extends Store {
    @observable private _recordId = "";

    get recordId(): string {
        return this._recordId;
    }

    set recordId(value: string) {
        this._recordId = value;
    }

    showPopup(recordId: string): void {
        this.isPopupShown = true;
        this._recordId = recordId;
    }

    hidePopup(): void {
        this.isPopupShown = false;
    }

    confirmDeleteRecord(diaryId: string, onUpdate$: Subject<void>): void {
        this.isPopupShown = false;
        this.isLoaded = true;
        const token = AppContext.getUserStore().getToken();
        const data: IDeleteRecord = {
            token,
            diaryId,
            recordId: this._recordId
        };
        this.transport.deleteRecord(data).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this.isLoaded = false;
                this.isSuccessPopupShown = true;
                onUpdate$.next();
            }
        });
    }
}
