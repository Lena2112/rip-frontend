import * as React from "react";
import { CreateRecipeStore } from "./CreateRecipeStore";
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
import { Ingredients } from "@components/ingredients";
import { isEmpty } from "lodash";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class CreateRecipe extends React.Component {
    private readonly store = new CreateRecipeStore();

    render() {
        const isRecipeValid =
            !this.store.isFormValid()
            || !this.store.isEditorValid()
            || !this.store.isIngredientsValid
            || isEmpty(this.store.ingredientsList)
            || this.store.imageSrc === "";
        return(
            <MainContainer>
                <Helmet>
                    <title>Создание дневника</title>
                </Helmet>
                <PageTitle title={"Создание рецепта"} />
                <div style={{display: "flex"}}>
                    <LeftBlock>
                        <LogoDiary src={this.store.imageSrc} onChange={this.store.onChangeImage} />
                    </LeftBlock>
                    <RightBlock>
                        <FieldContainer title={"Название рецепта"}>
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
                        <FieldContainer title={"Краткое описание"}>
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
                        <Ingredients
                            onClick={this.store.getIngredientsList}
                            isValid={this.store.checkIngredientsValid}
                        />
                        <br/>
                        <Button
                            title={"Создать"}
                            isDisable={isRecipeValid}
                            onClick={this.store.createRecipe}
                        />
                        <br/>
                        {this.store.isLoaded && <Preloader title={"Дневник создается"} />}
                        {this.store.isPopupShown &&
                            <InfoPopup
                                title={"Рецепт удачно создан!"}
                                onClick={this.store.hidePopup}
                            />
                        }
                    </RightBlock>
                </div>
            </MainContainer>
        );
     }
}
