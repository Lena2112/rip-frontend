import { IPopupProps } from "@components/popups/popup/IPopupProps";

export interface IInfoPopupProps extends IPopupProps {
    buttonTitle?: string;
    onClick(): void;
}
