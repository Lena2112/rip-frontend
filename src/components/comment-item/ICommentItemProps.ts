import { ICommentItem } from "./ICommentItem";
import { Subject } from "rxjs/internal/Subject";

export interface ICommentItemProps {
    comment: ICommentItem;
    onUpdate$: Subject<void>;
}
