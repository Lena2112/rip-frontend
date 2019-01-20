import { autobind } from "core-decorators";
import { observable } from "mobx";
import { head, last, get } from "lodash";
import { AppContext } from "@context";
import { Store } from "@app/stores";

@autobind
export class AvatarPanelStore extends Store {
    @observable private _src = "";
    @observable private _error = "";
    @observable private _isValid = false;
    @observable private _image: File;
    @observable private _buttonText = "Загрузить аватар";
    @observable private _popupText = "";

    get src(): string {
        return this._src;
    }

    set src(src: string) {
        this._src = src;
    }

    get error(): string {
        return this._error;
    }

    set error(src: string) {
        this._error = src;
    }

    get isValid(): boolean {
        return this._isValid;
    }

    set isValid(src: boolean) {
        this._isValid = src;
    }

    get image(): File {
        return this._image;
    }

    set image(image: File) {
        this._image = image;
    }

    get buttonText(): string {
        return this._buttonText;
    }

    set buttonText(value: string) {
        this._buttonText = value;
    }

    get popupText(): string {
        return this._popupText;
    }

    set popupText(value: string) {
        this._popupText = value;
    }

    switchPopup(): void {
        this.isPopupShown = !this.isPopupShown;
    }

    closeInfoPopup(): void {
        this.isSuccessPopupShown = false;
    }

    uploadAvatar(): void {
        if (this.isValid) {
            const formData = new FormData();
            formData.append("file", this.image);
            formData.append("token", AppContext.getUserStore().getToken());
            this.isValid = false;
            this.isLoaded = true;
            this.preloaderText = "Аватар загружается";
            this._buttonText = "Идет загрузка...";
            this.transport.uplodaAvatar(formData).then((respnse) => {
                const success = get(respnse.data, "success");
                if (success) {
                    AppContext.getStore().onUpdate$.next();
                    this.isLoaded = false;
                    this.isSuccessPopupShown = true;
                    this._buttonText = "Загрузить аватар";
                    this._popupText = "Аватар загружен";
                }
            });
        }
    }

    deleteAvatar(): void {
        const token = AppContext.getUserStore().getToken();
        this.isPopupShown = false;
        this.isLoaded = true;
        this.preloaderText = "Аватар  удаляется";
        this.transport.deleteAvatar(token).then(() => {
            this._src = "";
            this.isLoaded = false;
            this.isSuccessPopupShown = true;
            this._popupText = "Аватар удален!";
            AppContext.getStore().onUpdate$.next();
        });
    }

    dataURLtoFile(dataurl: string, filename: string): File {
        const type = head(dataurl.split(","));
        const src = last(dataurl.split(","));

        const mime = last(type!.match(/:(.*?);/));
        const byteString = atob(src!);
        let n = byteString.length;
        const u8arr = new Uint8Array(n);
        while (n) {
            u8arr[n - 1] = byteString.charCodeAt(n - 1);
            n -= 1; // to make eslint happy
        }
        const blob = new Blob([u8arr], { type: mime });
        const file = new File([blob], filename, { type: mime });
        return file;
    }
}
