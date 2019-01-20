import { autobind } from "core-decorators";
import { observable } from "mobx";
import { FormStore } from "@components/form-store";

@autobind
export class TextEditorStore extends FormStore {
    @observable private _textEditor = "";

    get textEditor(): string {
        return this._textEditor;
    }

    set textEditor(value: string) {
        this._textEditor = value;
    }

    onChangeTextEditor(text: string): void {
        this._textEditor = text;
    }

    isEditorValid(): boolean {
        return !(this._textEditor === "" || this._textEditor === "<p>&nbsp;</p>");
    }

}
