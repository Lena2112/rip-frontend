import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { observable } from "mobx";
import { get } from "lodash";
import { IDiaryPreviewSmall } from "@components/diary-preview-small";
import { Store } from "@app/stores";
import { EAppPaths } from "@config/EAppPaths";

@autobind
export class MyDiariesStore extends Store {
    @observable private _diariesList: IDiaryPreviewSmall[] = [];
    @observable private _diaryId = "";
    @observable private _name = "";
    @observable private _diariesQuantity = 0;

    get diariesList(): IDiaryPreviewSmall[] {
        return this._diariesList;
    }

    get diaryId(): string {
        return this._diaryId;
    }

    set diaryId(value: string) {
        this._diaryId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get diariesQuantity(): number {
        return this._diariesQuantity;
    }

    getDiaries(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.getMyDiaries(token).then((response) => {
           const success = get(response.data, "success");
           if (success) {
                this._diariesList = get(response.data, "data.data");
                this._diariesQuantity = get(response.data, "data.quantity");
           }
        });
    }

    onEditDiary(diaryId: string): void {
        const link = EAppPaths.EDIT_DIARY.replace(":diaryId", diaryId);
        AppContext.getHistory().push(link);
    }

    onAddRecord(diaryId: string): void {
        const link = EAppPaths.ADD_RECORD.replace(":diaryId", diaryId);
        AppContext.getHistory().push(link);
    }

    onDeleteDiary(): void {
        const token = AppContext.getUserStore().getToken();
        this.isLoaded = true;
        this.isPopupShown = false;
        this.transport.deleteDiary(token, this._diaryId, this._name).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this.onUpdate$.next();
               this.isLoaded = false;
               this.isSuccessPopupShown = true;
           }
        });
    }

    showPopup(diaryId: string, name: string): void {
        this._diaryId = diaryId;
        this._name = name;
        this.isPopupShown = true;
    }

    hidePopup(): void {
        this.isPopupShown = false;
    }
}
