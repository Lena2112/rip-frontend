import { autobind } from "core-decorators";
import { get, isEmpty } from "lodash";
import { TextEditorStore } from "@pages/text-editor-store";
import { observable } from "mobx";
import { IIngredient } from "@interfaces/";
import { AppContext } from "@context";

@autobind
export class CreateRecipeStore extends TextEditorStore  {
    @observable private _imageSrc = "";
    @observable private _ingredientsList: IIngredient[] = [];
    @observable private _isIngredientsValid = false;
    @observable private _imageFile: File;

    get ingredientsList(): IIngredient[] {
        return this._ingredientsList;
    }

    set ingredientsList(value: IIngredient[]) {
        this._ingredientsList = value;
    }

    get imageSrc(): string {
        return this._imageSrc;
    }

    set imageSrc(value: string) {
        this._imageSrc = value;
    }

    get imageFile(): File {
        return this._imageFile;
    }

    set imageFile(value: File) {
        this._imageFile = value;
    }

    get isIngredientsValid(): boolean {
        return this._isIngredientsValid;
    }

    set isIngredientsValid(value: boolean) {
        this._isIngredientsValid = value;
    }

    onChangeImage(src: string, file: File): void {
        this.imageSrc = src;
        this.imageFile = file;
    }

    createRecipe(): void {
        const isValid =
            this.isFormValid()
            || this.isEditorValid()
            || this.isIngredientsValid
            || !isEmpty(this.ingredientsList)
            || this.imageSrc !== "";
        if (isValid) {
            const token = AppContext.getUserStore().getToken();
            const data = this.getFormValues();
            const nameArticle: string = get(data, "text");
            const formData = new FormData();
            formData.append("file", this.imageFile);
            formData.append("token", token);
            formData.append("name", nameArticle);
            formData.append("description", this.textEditor);
            formData.append("ingredients", JSON.stringify(this.ingredientsList));
            this.transport.createRecipe(formData).then((response) => {
                const success = get(response.data, "success");
                if (success) {
                    this.isPopupShown = true;
                    this.resetFields();
                }
            });
        }
    }

    showNotification(): void {
        this.isPopupShown = true;
        window.setTimeout(() => {
            this.isPopupShown = false;
        }, 5000);
    }

    hideNotification(): void {
        this.isPopupShown = false;
    }

    getIngredientsList(list: IIngredient[]): void {
        this._ingredientsList = list;
    }

    checkIngredientsValid(value: boolean): void {
        this._isIngredientsValid = value;
    }
}
