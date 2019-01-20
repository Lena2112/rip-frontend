import { Subject } from "rxjs";

export interface IAddCommentProps {
    diaryId: string;
    recordId: string;
    onUpdate$: Subject<void>;
}
