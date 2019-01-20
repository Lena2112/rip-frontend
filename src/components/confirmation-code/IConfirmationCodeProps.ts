import { IFormProps } from "../field/IFormProps";

export interface IConfirmationCodeProps extends IFormProps {
    login: string;
    title: string;
    description: string;

    confirmLater(): void;
}
