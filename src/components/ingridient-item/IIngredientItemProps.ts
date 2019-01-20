import { Field } from "@components/field/Field";

export interface IIngredientItemProps {
    addField(field: Field): void;
    onChange(id: string, text: string): void;
}
