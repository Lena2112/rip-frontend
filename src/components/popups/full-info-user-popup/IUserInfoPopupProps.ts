import { IPopupProps } from "@components/popups/popup";
import { IUserListRow } from "@components/user-list-row";
import { Subject } from "rxjs/internal/Subject";

export interface IUserInfoPopupProps extends IPopupProps {
    data: IUserListRow;
    onUpdateUser$: Subject<void>;

    blockUser(id: string): void;
    onClose(): void;
}
