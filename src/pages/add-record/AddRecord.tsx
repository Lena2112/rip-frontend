import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { AddRecordStore } from "@pages/add-record/AddRecordStore";
import { InputField } from "@components/input-field";
import { EFormTypes } from "@config/EFormTypes";
import { FieldContainer } from "@components/field-container";
import { Button } from "@components/button";
import { Preloader } from "@components/preloader";
import { InfoPopup } from "@components/popups/info-popup";
import { last } from "lodash";
import { ESocketEvents, Socket } from "@services/socket";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class AddRecord extends React.Component {
    private readonly store = new AddRecordStore();
    private readonly socket = new Socket();

    componentDidMount(): void {
        this.store.getShortData();
        const diaryId = last(window.location.pathname.split("/"));
        this.socket.connect();
        this.store.onUpdate$.subscribe(() => {
            this.store.getShortData();
            this.socket.emit(ESocketEvents.ADD_RECORD, diaryId);
        });
    }

    render(): React.ReactNode {
        return (
            <MainContainer>
                <Helmet>
                    <title>Добавить запись</title>
                </Helmet>
                <PageTitle title={`Добавить запись в дневник ${this.store.shortData.diaryName}`} />
                <h2 style={{marginBottom: 30}}>Запись #{this.store.shortData.nextPosition}</h2>
                <FieldContainer title={"Название записи"}>
                    <InputField
                        addField={this.store.addField}
                        formType={EFormTypes.TEXT}
                        placeholder={"Имя"}
                        isReadonly={false}
                        isRequired={true}
                        isClear={false}
                        onChange={this.store.onChange}
                        className={"full-width change-item"}
                    />
                </FieldContainer>
                <FieldContainer title={"Текст записи"}>
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
                    title={"Создать"}
                    isDisable={!this.store.isFormValid() || !this.store.isEditorValid()}
                    onClick={this.store.addRecord}
                />
                {this.store.isLoaded && <Preloader title={"Запись добавляется"} />}
                {this.store.isPopupShown &&
                    <InfoPopup
                        title={"Запись успешно добавлена"}
                        onClick={this.store.hidePopup}
                    />
                }
            </MainContainer>
        );
    }
}
