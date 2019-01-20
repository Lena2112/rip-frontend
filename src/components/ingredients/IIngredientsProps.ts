import { IIngredient } from "@interfaces/";

export interface IIngredientsProps {
    onClick(list: IIngredient[]): void;
    isValid(isValid: boolean): void;
}
