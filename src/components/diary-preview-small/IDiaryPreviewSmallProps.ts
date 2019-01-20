import { IDiaryPreviewSmall } from "./IDiaryPreviewSmall";

export interface IDiaryPreviewSmallProps {
    data: IDiaryPreviewSmall;

    onEditDiary(diaryId: string, name: string): void;

    onDeleteDiary(diaryId: string, name: string): void;

    onAddRecord(diaryId: string): void;
}
