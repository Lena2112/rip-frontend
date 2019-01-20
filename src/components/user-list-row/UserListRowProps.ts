import { IUserListRow } from "./IUserListRow";
import { Subject } from "rxjs/internal/Subject";

export interface IUserListRowProps {
    data: IUserListRow;
    onUpdate$: Subject<void>;

    onClick(userId: string): void;
}
