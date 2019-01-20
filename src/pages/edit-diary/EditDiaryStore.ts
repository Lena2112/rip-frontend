import { autobind } from "core-decorators";
import { get, last } from "lodash";
import { TextEditorStore } from "@pages/text-editor-store";
import { observable } from "mobx";
import { AppContext } from "@context";
import { IDiaryData } from "@pages/diary/IDiaryData";
import { IDiaryEdit } from "@interfaces/";
import { IRecordItem } from "@components/record-item";

@autobind
export class EditDiaryStore extends TextEditorStore  {
    @observable private _imageSrc = "";

    @observable private _diary: IDiaryData = {
        id: "",
        name: "",
        created: "",
        description: "",
        logo: "",
    };

    @observable private _records: IRecordItem[] = [];

    get imageSrc(): string {
        return this._imageSrc;
    }

    set imageSrc(value: string) {
        this._imageSrc = value;
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

    onChangeImage(src: string): void {
        this.imageSrc = src;
    }

    getDiaryData(): void {
        const url = window.location.pathname;
        const diaryId = last(url.split("/"));
        if (!diaryId) {
            return;
        }
        this.transport.editDiaryData(diaryId).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this._diary = get(response.data, "data");
                this.textEditor = this._diary.description;
                this._imageSrc = this._diary.logo;
            }
        });
    }

    editDiary(): void {
        if (this.isFormValid() || this.isEditorValid() || this.isLogoChanged()) {
            const token = AppContext.getUserStore().getToken();
            const fieldData = this.getFormValues();
            const nameArticle: string = get(fieldData, "text");
            const data: IDiaryEdit = {
                token,
                name: nameArticle,
                description: this.textEditor,
                logo: this._imageSrc,
                diaryId: this._diary.id
            };
            this.isLoaded = true;
            this.transport.editDiary(data)
                .then((response) => {
                    const success = get(response.data, "success");
                    if (success) {
                        this.textEditor = "";
                        this._imageSrc = "";
                        this.isLoaded = false;
                        this.isPopupShown = true;
                        this.makeFieldsInvalid();
                        this.onUpdate$.next();
                    } else {
                        this.isLoaded = false;
                        const error = get(response.data, "error");
                        this.setServerError(error);
                    }
                });
        }
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

    isLogoChanged(): boolean {
        return this._imageSrc !== this._diary.logo;
    }
}
