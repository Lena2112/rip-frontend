import * as React from "react";
import { EditDiaryStore } from "./EditDiaryStore";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MainContainer } from "@components/main-container";
import { LeftBlock } from "@components/left-block";
import { LogoDiary } from "@components/logo-diary";
import { RightBlock } from "@components/right-block";
import { FieldContainer } from "@components/field-container";
import { InputField } from "@components/input-field";
import { EFormTypes } from "@config/EFormTypes";
import { Button } from "@components/button";
import { Preloader } from "@components/preloader";
import { InfoPopup } from "@components/popups/info-popup/";
import { ESocketEvents, Socket } from "@services/socket";
import { IRecordItem } from "@components/record-item";
import { EditRecordItem } from "@components/edit-record-item";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class EditDiary extends React.Component {
    private readonly store = new EditDiaryStore();
    private readonly socket = new Socket();

    componentDidMount(): void {
        this.socket.connect();
        this.store.getDiaryData();
        this.socket.on(ESocketEvents.UPDATE_DIARY_INFO, this.store.getDiaryData);
        this.socket.on(ESocketEvents.ADD_RECORD, this.store.getRecords);
        this.store.onUpdate$.subscribe(() => {
            this.socket.emit(ESocketEvents.UPDATE_DIARY_INFO, this.store.diary.id);
            this.socket.emit(ESocketEvents.ADD_RECORD, this.store.diary.id);
        });
        this.store.getRecords();
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Редактирование дневника</title>
                </Helmet>
                <PageTitle title={"Редактирование дневника"} />
                <div style={{display: "flex"}}>
                    <LeftBlock>
                        <LogoDiary src={this.store.imageSrc} onChange={this.store.onChangeImage} />
                    </LeftBlock>
                    <RightBlock>
                        <FieldContainer title={"Название дневника"}>
                            <InputField
                                addField={this.store.addField}
                                formType={EFormTypes.TEXT}
                                placeholder={"Имя"}
                                isReadonly={false}
                                isRequired={true}
                                isClear={false}
                                onChange={this.store.onChange}
                                value={this.store.diary.name}
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
                            isDisable={(!this.store.isFormValid() || !this.store.isEditorValid()) && !this.store.isLogoChanged()}
                            onClick={this.store.editDiary}
                        />
                        <br/>
                        {this.store.records.map((data: IRecordItem) => {
                            return(
                                <EditRecordItem key={data._id} data={data} onUpdate$={this.store.onUpdate$}/>
                            );
                        })}
                        {this.store.isLoaded && <Preloader title={"Изменения сохрнаются"} />}
                        {this.store.isPopupShown &&
                            <InfoPopup
                                title={"Изменения сохранены!"}
                                onClick={() => {this.store.isPopupShown = false; }}
                            />
                        }
                    </RightBlock>
                </div>
            </MainContainer>
        );
     }
}
