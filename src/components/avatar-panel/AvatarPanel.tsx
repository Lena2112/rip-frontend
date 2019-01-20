import * as React from "react";
import { IAvatarPanelProps } from "./IAvatarPanelProps";
import "./AvatarPanel.scss";
import { Button } from "@components/button";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { ChangeEvent, createRef, RefObject } from "react";
import { head } from "lodash";
import { AvatarPanelStore } from "./AvatarPanelStore";
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { ConfirmPopup } from "@components/popups/confirm-popup";
import { InfoPopup } from "@components/popups/info-popup";
import { Preloader } from "@components/preloader";

const defaultAvatar = require("./img/default-avatar.jpg");
const MAX_IMAGE_SIZE = 5242880;

@observer
@autobind
export class AvatarPanel extends React.Component<IAvatarPanelProps> {
    private readonly inputRef: RefObject<HTMLInputElement> = createRef();
    private readonly store = new AvatarPanelStore();

    open(): void {
        this.inputRef.current!.click();
    }

    componentDidMount() {
        this.store.src = this.props.src;
    }

    // tslint:disable-next-line:no-null-keyword
    getSnapshotBeforeUpdate(prevProps: Readonly<IAvatarPanelProps>): null {
        const isPropChanged = this.props.src !== prevProps.src;
        if (isPropChanged && this.props.src) {
            this.store.src = this.props.src;
        }
        // tslint:disable-next-line:no-null-keyword
        return null;
    }

    onChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = head(event.target.files);
        if (!file) {
            return;
        }
        if (!this.isImageValid(file)) {
            return;
        }
        this.loadImage(file);
    }

    onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
           return;
        }
        target.setAttribute("src", defaultAvatar);
    }

    render() {
        return(
            <>
                <div className="avatar">
                    <div className="avatar_panel">
                        <div className="avatar_panel_controls">
                            <div className="avatar_panel__icon"  onClick={this.open}>
                                <div className="avatar_panel__edit"/>
                            </div>
                            {this.props.src &&
                            <div className="avatar_panel__icon">
                                <div className="avatar_panel__delete" onClick={this.store.switchPopup}/>
                            </div>}
                        </div>
                        <img
                            src={this.store.src || this.props.src || defaultAvatar}
                            alt=""
                            className="avatar_image"
                            onError={this.onLogoLoadError}
                        />
                        <input
                            type={"file"}
                            className="input"
                            ref={this.inputRef}
                            onChange={this.onChange}
                            accept={"image/png, image/jpg"}
                        />
                    </div>
                    {this.store.error && <div className="avatar-error">{this.store.error}</div>}
                    <Button title={this.store.buttonText} isDisable={!this.store.isValid} onClick={this.store.uploadAvatar} />
                </div>
                {this.store.isPopupShown &&
                    <ConfirmPopup
                        onSubmit={this.store.deleteAvatar}
                        onCancel={this.store.switchPopup}
                        title={"Вы действительно хотите удалить свой аватар?"}
                    />
                }
                {this.store.isSuccessPopupShown &&
                    <InfoPopup
                        title={this.store.popupText}
                        onClick={this.store.closeInfoPopup}
                    />
                }
                {this.store.isLoaded &&
                    <Preloader title={this.store.preloaderText}/>
                }
            </>
        );
    }

    private loadImage(file: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        fromEvent(reader, "loadend").subscribe(async () => {
            try {
                this.store.src = reader.result as string;
                this.store.image = this.store.dataURLtoFile(this.store.src, file.name);
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
}
