import { IPopupProps } from "../popup/IPopupProps";

export interface IConfirmPopupProps extends IPopupProps {
    onSubmit(): void;
    onCancel(): void;
}
