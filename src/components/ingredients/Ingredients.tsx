import * as React from "react";
import { autobind } from "core-decorators";
import { IngredientsStore } from "@components/ingredients/IngredientsStore";
import { IngredientItem } from "@components/ingridient-item";
import { Button } from "@components/button";
import { FieldContainer } from "@components/field-container";
import { observer } from "mobx-react";
import { IIngredientsProps } from "@components/ingredients/IIngredientsProps";

@observer
@autobind
export class Ingredients extends React.Component<IIngredientsProps> {
    private readonly store = new IngredientsStore();

    componentDidMount(): void {
        this.props.isValid(this.store.isFormValid());
    }

    componentDidUpdate(): void {
        this.props.isValid(this.store.isFormValid());
    }

    render(): React.ReactNode {
        return (
            <FieldContainer title={"Ингредиенты"}>
                {this.store.ingredientsList.map((value, index) => {
                    return (
                        <IngredientItem
                            key={index}
                            addField={this.store.addField}
                            onChange={this.store.onChange}
                        />
                    );
                })}
                <Button
                    title={"Добавить строку"}
                    isDisable={false}
                    onClick={this.store.createRow}
                />
                <br/>
                <Button
                    title={"Подтвердить"}
                    isDisable={!this.store.isFormValid()}
                    onClick={this.confirmIngredients}
                />
            </FieldContainer>
        );
    }

    private confirmIngredients(): void {
        this.store.getData();
        this.props.onClick(this.store.ingredientsList);
    }
}
