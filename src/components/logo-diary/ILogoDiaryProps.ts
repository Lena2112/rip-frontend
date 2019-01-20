export interface ILogoDiaryProps {
    src: string;
    maxImageSize?: number;

    onChange(src: string, file: File): void;
}
