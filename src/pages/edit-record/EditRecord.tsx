import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MainContainer } from "@components/main-container";
import { FieldContainer } from "@components/field-container";
import { InputField } from "@components/input-field";
import { EFormTypes } from "@config/EFormTypes";
import { Button } from "@components/button";
import { EditRecordStore } from "@pages/edit-record/EditRecordStore";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { ESocketEvents, Socket } from "@services/socket";
import { Preloader } from "@components/preloader";
import { InfoPopup } from "@components/popups/info-popup";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class EditRecord extends React.Component {
    private readonly store = new EditRecordStore();
    private readonly socket = new Socket();

    componentDidMount(): void {
        this.socket.connect();
        this.store.getRecord();
        this.socket.on(ESocketEvents.ADD_RECORD, this.store.getRecord);
        this.store.onUpdate$.subscribe(() => {
            this.socket.emit(ESocketEvents.ADD_RECORD, this.store.record.diaryId);
        });
    }

    render(): React.ReactNode {
        return (
            <MainContainer>
                <Helmet>
                    <title>Редактирование записи</title>
                </Helmet>
                <PageTitle title={"Редактирование записи"} />
                <FieldContainer title={"Название дневника"}>
                    <InputField
                        addField={this.store.addField}
                        formType={EFormTypes.TEXT}
                        placeholder={"Имя"}
                        isReadonly={false}
                        isRequired={true}
                        isClear={false}
                        onChange={this.store.onChange}
                        value={this.store.record.name}
                        className={"full-width change-item"}
                    />
                </FieldContainer>
                <FieldContainer title={"Описание дневника"}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.store.textEditor}
                        onChange={(event: any, editor: any) => {
                            this.store.onChangeTextEditor(editor.getData());
                        }}
                        config={
                            {
                                toolbar: [ "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote" ],
                            }
                        }
                    />
                </FieldContainer>
                <Button
                    title={"сохранить изменения"}
                    isDisable={!this.store.isFormValid() || !this.store.isEditorValid()}
                    onClick={this.store.editRecord}
                />
                {this.store.isLoaded &&
                    <Preloader title={"Изменения сохраняются"} />
                }
                {this.store.isSuccessPopupShown &&
                    <InfoPopup
                        title={"Изменения сохранены"}
                        onClick={this.store.hideSuccessPopup}
                    />
                }
            </MainContainer>
        );
    }
}
