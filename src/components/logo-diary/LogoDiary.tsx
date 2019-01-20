import * as React from "react";
import { ILogoDiaryProps } from "./ILogoDiaryProps";
import { createRef, RefObject } from "react";
import { LogoDiaryStore } from "@components/logo-diary/LogoDiaryStore";
import { ChangeEvent } from "react";
import { fromEvent } from "rxjs";
import { head } from "lodash";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import "./LogoDiary.scss";
import { ConfirmPopup } from "@components/popups/confirm-popup";

const defaultLogo = require("./img/default-diary-image.png");
const MAX_IMAGE_SIZE = 5242880;

@observer
@autobind
export class LogoDiary extends React.Component<ILogoDiaryProps> {
    private readonly store = new LogoDiaryStore();
    private readonly inputRef: RefObject<HTMLInputElement> = createRef();

    // tslint:disable-next-line:no-null-keyword
    getSnapshotBeforeUpdate(prevProps: Readonly<ILogoDiaryProps>): null {
        const isPropChanged = this.props.src !== prevProps.src;
        if (isPropChanged && this.props.src) {
            this.store.src = this.props.src;
        }
        // tslint:disable-next-line:no-null-keyword
        return null;
    }

    componentDidUpdate(): void {
        this.store.src = this.props.src;
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="logo-diary">
                    <div className="logo-diary_controls">
                        <div className="logo-diary_edit logo-diary_icon" onClick={this.open}/>
                        {this.props.src && <div className="logo-diary_delete logo-diary_icon" onClick={this.showPopup}/>}
                    </div>
                    <img
                        src={this.store.src || this.props.src || defaultLogo}
                        onError={this.onLogoLoadError}
                        className="logo-diary_image"
                    />
                    <input
                        type="file"
                        ref={this.inputRef}
                        className="logo-diary_input"
                        onChange={this.onChange}
                    />
                </div>
                {this.store.isPopupShown &&
                    <ConfirmPopup
                        title={"Вы действительно хотите удалить лого?"}
                        onCancel={this.hidePopup}
                        onSubmit={this.deleteLogo}
                    />
                }
            </>
        );
    }

    private onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
            return;
        }
        target.setAttribute("src", defaultLogo);
    }

    private open(): void {
        this.inputRef.current!.click();
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = head(event.target.files);
        if (!file) {
            return;
        }
        if (!this.isImageValid(file)) {
            return;
        }
        this.loadImage(file);
    }

    private loadImage(file: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        fromEvent(reader, "loadend").subscribe(async () => {
            try {
                this.store.src = reader.result as string;
                this.props.onChange(reader.result as string, file);
            } catch (error) {
                // Nothing here
            }
        });
    }

    private isImageValid(file: File): boolean {
        let isValid = true;
        const whiteList = ["image/png", "image/jpeg", "image/gif"];
        if (file.size > MAX_IMAGE_SIZE) {
            this.store.error = "Картинка слишком большая! Максимальный размер картинки 5МБ";
            isValid = false;
            this.store.isValid = false;
        } else if (whiteList.indexOf(file.type) === -1) {
            this.store.error = "Неразрешенный тип файла! Картинка должна иметь расширение .jpg, .png или .gif";
            isValid = false;
            this.store.isValid = false;
        } else {
            isValid = true;
            this.store.error = "";
            this.store.isValid = true;
        }
        return isValid;
    }

    private hidePopup(): void {
        this.store.isPopupShown = false;
    }

    private deleteLogo(): void {
        this.store.src = "";
        this.store.isPopupShown = false;
    }

    private showPopup(): void {
        this.store.isPopupShown = true;
    }
}
