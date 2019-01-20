import { IDropDownItem } from "../dropdown-item/";

export interface IDropDownProps {
    current: string;
    items: IDropDownItem[];
    className?: string;
    classNameContent?: string;
    classNameItem?: string;
}
