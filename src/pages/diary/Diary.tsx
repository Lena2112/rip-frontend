import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { MainContainer } from "@components/main-container";
import { DiaryStore } from "@pages/diary/DiaryStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IRecordItem, RecordItem } from "@components/record-item";
import { RightBlock } from "@components/right-block";
import { LeftBlock } from "@components/left-block";
import "./Diary.scss";
import { SmallAvatar } from "@components/small-avatar";
import { Link } from "react-router-dom";
import { formatDate } from "@helpers/helpers";
import { ESocketEvents, Socket } from "@services/socket";

const defaultLogo = require("./img/default-diary-image.png");

@observer
@autobind
export class Diary extends React.Component {
    private readonly store = new DiaryStore();
    private readonly socket = new Socket();

    componentDidMount(): void {
        this.store.getDiaryId();
        this.socket.connect();
        this.socket.emit(ESocketEvents.JOIN_DIARY, this.store.diaryId);
        this.store.getDiaryData();
        this.store.getRecords();
        this.socket.on(ESocketEvents.UPDATE_DIARY_INFO, this.store.getDiaryData);
        this.socket.on(ESocketEvents.ADD_RECORD, this.store.getRecords);
    }

    componentWillUnmount(): void {
        this.socket.disconnect();
    }

    render(): React.ReactNode {
        return (
            <MainContainer>
                <Helmet>
                    <title>{this.store.diary.name}</title>
                </Helmet>
                <br/>
                <br/>
                <PageTitle title={this.store.diary.name} />
                <div style={{display: "flex"}}>
                    <LeftBlock>
                        <div className="diary-block">
                            <img
                                src={this.store.diary.logo ? this.store.diary.logo : defaultLogo}
                                alt={this.store.diary.name}
                                onError={this.onLogoLoadError}
                                className={"full-width"}
                            />
                        </div>
                    </LeftBlock>
                    <RightBlock>
                        <div className="diary-block">
                            <h2 className="diary-block_text-line">Информация о дневнике: </h2>
                            <div className="diary-block_text-line">Этот дневник был создан {formatDate(this.store.diary.created)}</div>
                            <div className="diary-block_text-line">
                                Создатель: &nbsp;
                                <Link to={`/user/${this.store.author.id}`} className="diary-block_link">
                                    <SmallAvatar
                                        src={this.store.author.avatar}
                                        type={"avatar"}
                                        alt={this.store.author.name}
                                        size={"small"}
                                    />
                                    <span className="diary-block_name">{this.store.author.name}</span>
                                </Link>
                            </div>
                            <h3 className="diary-block_text-line">Описание: </h3>
                            <div className="diary-block_text-line" dangerouslySetInnerHTML={{__html: this.store.diary.description}}/>
                        </div>
                        {this.store.records.slice().reverse().map((data: IRecordItem) => {
                            return (
                                <RecordItem
                                    key={data._id}
                                    recordData={data}
                                    diaryName={this.store.diary.name}
                                    dairyLogo={this.store.diary.logo}
                                    diaryId={this.store.diary.id || this.store.diaryId}
                                    emit={this.socket.emit}
                                    on={this.socket.on}
                                />
                            );
                        })}
                    </RightBlock>
                </div>
            </MainContainer>
        );
    }

    private onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
            return;
        }
        target.setAttribute("src", defaultLogo);
    }
}
