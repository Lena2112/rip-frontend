import { autobind } from "core-decorators";
import { FormStore } from "@components/form-store";
import { mapValues, chunk } from "lodash";
import { observable } from "mobx";
import { IIngredient } from "@interfaces/";

@autobind
export class IngredientsStore extends FormStore {
    @observable private _ingredientsList: IIngredient[] = [{
        name: "",
        weight: ""
    }];

    get ingredientsList(): IIngredient[] {
        return this._ingredientsList;
    }

    set ingredientsList(value: IIngredient[]) {
        this._ingredientsList = value;
    }

    getData(): void {
        const stringList: string[] = [];
        const values = this.getFormValuesById();
        mapValues(values, (value: string) => {
            stringList.push(value);
        });
        const chunkSize = stringList.length / (stringList.length / 2);
        chunk(stringList, chunkSize).map((data: string[]) => {
               const ingredient: IIngredient = {
                    name: data[0],
                    weight: data[1]
               };
               this._ingredientsList.push(ingredient);
        });
        this.cutIngredientsList();
    }

    createRow(): void {
        const item: IIngredient = {
            name: "",
            weight: ""
        };
        this._ingredientsList.push(item);
    }

    private cutIngredientsList(): void {
        const length = this._ingredientsList.length;
        this._ingredientsList = this._ingredientsList.slice(length / 2, length);
    }
}
