import { IRecordItem } from "./IRecordItem";

export interface IRecordItemProps {
    recordData: IRecordItem;
    diaryName: string;
    dairyLogo: string;
    diaryId: string;

    emit(event: string, ...args: any[]): void;
    on(event: string, callback: (data: any) => void): void;
}
