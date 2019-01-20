import { IPopupProps } from "../popups/popup/IPopupProps";

export interface IInfoPopupProps extends IPopupProps {
    buttonTitle: string;
    onClick(): void;
}
