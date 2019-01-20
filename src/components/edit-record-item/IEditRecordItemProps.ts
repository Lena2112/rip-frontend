import { IRecordItem } from "@components/record-item";
import { Subject } from "rxjs";

export interface IEditRecordItemProps {
    data: IRecordItem;
    onUpdate$: Subject<void>;
}
