import { IUserListRow } from "@components/user-list-row/";

export interface IUserListRowViewProps {
    data: IUserListRow;

    onClick(userId: string): void;
}
