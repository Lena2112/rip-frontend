export interface IButtonProps {
    title: string;
    isDisable: boolean;
    className?: string;

    onClick(): void;
}
