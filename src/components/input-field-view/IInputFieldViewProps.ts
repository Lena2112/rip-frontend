import * as React from "react";

export interface IInputFieldViewProps {
    type: string;
    placeholder: string;
    isReadonly: boolean;
    isRequired: boolean;
    isClear: boolean;
    value: string;
    maxLength: number;
    isFocused: boolean;
    className?: string;
    error?: string;

    onChange(event: React.ChangeEvent<HTMLInputElement>): void;

    onFocus?(): void;

    onBlur?(): void;
}
