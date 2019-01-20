import { FormStore } from "@components/form-store";
import { autobind } from "core-decorators";
import { mapValues } from "lodash";
import { IIngredient } from "@interfaces/";
import { observable } from "mobx";

@autobind
export class IngredientItemStore extends FormStore {
    @observable ingredient: IIngredient;

    getIngridients(): void {
        const list: string[] = [];
        const values = this.getFormValuesById();
        mapValues(values, (value: string, key: string) => {
           list.push(value);
        });
        this.ingredient = {
            name: list[0],
            weight: list[1]
        };
    }
}
