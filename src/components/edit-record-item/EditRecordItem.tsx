import * as React from "react";
import { IEditRecordItemProps } from "./IEditRecordItemProps";
import { EditRecordItemStore } from "./EditRecordItemStore";
import { Button } from "@components/button";
import { formatDate } from "@helpers/helpers";
import "./EditRecordItem.scss";
import { ConfirmPopup } from "@components/popups/confirm-popup";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Preloader } from "@components/preloader";
import { InfoPopup } from "@components/popups/info-popup";
import { AppContext } from "@context";

@observer
@autobind
export class EditRecordItem extends React.Component<IEditRecordItemProps> {
    private readonly store = new EditRecordItemStore();

    render(): React.ReactNode {
        return (
            <>
                <div className="edit-record-item record-item">
                    <div className="fourth">{this.props.data.name}</div>
                    <div className="fourth">{formatDate(this.props.data.created)}</div>
                    <div className="fourth">
                        <Button
                            title={"Редактировать"}
                            isDisable={false}
                            onClick={this.goToEditRecord}
                        />
                    </div>
                    <div className="fourth">
                        <Button
                            title={"Удалить"}
                            isDisable={false}
                            onClick={this.showPopup}
                        />
                    </div>
                </div>
                {this.store.isPopupShown &&
                    <ConfirmPopup
                        title={"Вы действительно хотите удалить запись?"}
                        onSubmit={this.deleteRecord}
                        onCancel={this.store.hidePopup}
                    />
                }
                {this.store.isLoaded &&
                    <Preloader title={"Статья удаляется"} />
                }
                {this.store.isSuccessPopupShown &&
                    <InfoPopup
                        title={"Зарись удалена"}
                        onClick={this.store.hideSuccessPopup}
                    />
                }
            </>
        );
    }

    private showPopup(): void {
        this.store.showPopup(this.props.data._id);
    }

    private deleteRecord(): void {
        this.store.confirmDeleteRecord(this.props.data.diaryId, this.props.onUpdate$);
    }

    private goToEditRecord(): void {
        AppContext.getHistory().push(`/edit-record/${this.props.data.diaryId}/${this.props.data._id}`);
    }
}
