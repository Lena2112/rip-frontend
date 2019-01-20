import * as React from "react";
import { autobind } from "core-decorators";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MyDiariesStore } from "@pages/my-diaries/MyDiariesStore";
import { observer } from "mobx-react";
import { DiaryPreviewSmall, IDiaryPreviewSmall } from "@components/diary-preview-small";
import { ConfirmPopup } from "@components/popups/confirm-popup";
import { Preloader } from "@components/preloader";
import { InfoPopup } from "@components/popups/info-popup";

@observer
@autobind
export class MyDiaries extends React.Component {
    private readonly store = new MyDiariesStore();

    componentDidMount(): void {
        this.store.getDiaries();
        this.store.onUpdate$.subscribe(this.store.getDiaries);
    }

    render() {
        return (
            <MainContainer>
                <Helmet>
                    <title>Мои дневники</title>
                </Helmet>
                <PageTitle title={"Мои дневники"} />
                <h2>Количество дневников: {this.store.diariesQuantity}</h2>
                <div>
                    {this.store.diariesList.slice().reverse().map((data: IDiaryPreviewSmall) => {
                        return(
                            <DiaryPreviewSmall
                                data={data}
                                key={data.diaryId}
                                onEditDiary={this.store.onEditDiary}
                                onDeleteDiary={this.store.showPopup}
                                onAddRecord={this.store.onAddRecord}
                            />
                        );
                    })}
                </div>
                {this.store.isPopupShown &&
                    <ConfirmPopup
                        title={"Вы действительно хотите удалить дневник?"}
                        onCancel={this.store.hidePopup}
                        onSubmit={this.store.onDeleteDiary}
                    />
                }
                {this.store.isLoaded && <Preloader title={"Дневник удаляется"} />}
                {this.store.isSuccessPopupShown &&
                    <InfoPopup
                        title={"Дневник успешно удален"}
                        onClick={this.store.hideSuccessPopup}
                    />
                }
            </MainContainer>
        );
    }
}
