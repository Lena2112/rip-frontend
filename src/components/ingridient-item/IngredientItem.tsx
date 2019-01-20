import * as React from "react";
import { EFormTypes } from "@config/EFormTypes";
import { InputField } from "@components/input-field";
import "./IngridientItem.scss";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IIngredientItemProps } from "./IIngredientItemProps";

@observer
@autobind
export class IngredientItem extends React.Component<IIngredientItemProps> {

    render(): React.ReactNode {
        return (
            <>
                <InputField
                    addField={this.props.addField}
                    formType={EFormTypes.TEXT}
                    placeholder={"Ингредиент"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={false}
                    onChange={this.props.onChange}
                    className={"half-width ingredient-item"}
                />
                <InputField
                    addField={this.props.addField}
                    formType={EFormTypes.TEXT}
                    placeholder={"Количество"}
                    isReadonly={false}
                    isRequired={true}
                    isClear={false}
                    onChange={this.props.onChange}
                    className={"half-width ingredient-item"}
                />
            </>
        );
    }
}
