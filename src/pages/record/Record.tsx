import * as React from "react";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { RecordStore } from "@pages/record/RecordStore";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { SmallAvatar } from "@components/small-avatar";
import { Link } from "react-router-dom";
import { formatDate } from "@helpers/helpers";
import "./Record.scss";
import { CommentItem, ICommentItem } from "@components/comment-item";
import { AddComment } from "@components/add-comment";
import { ESocketEvents, Socket } from "@services/socket";
import { last } from "lodash";

@observer
@autobind
export class Record extends  React.Component {
    private readonly store = new RecordStore();
    private readonly socket = new Socket();

    componentDidMount(): void {
        this.store.getRecord();
        this.store.getComments();
        this.socket.connect();
        const recordId = last(window.location.pathname.split("/"));
        this.socket.emit(ESocketEvents.JOIN_RECORD, recordId);
        this.socket.on(ESocketEvents.UPDATE_COMMENTS, () => {
            this.store.getComments();
        });
        this.socket.on(ESocketEvents.ADD_RECORD, () => {
            this.store.getRecord();
        });
        this.store.onUpdate$.subscribe(() => this.socket.emit(ESocketEvents.ADD_COMMENT));
    }

    render(): React.ReactNode {
        return (
            <MainContainer>
                <Helmet>
                    <title>{this.store.record.name}</title>
                </Helmet>
                <PageTitle title={this.store.record.name} />
                <div className="record-short-data">
                    <Link to={`/diary/${this.store.login}/${this.store.diary.id}`} className="record-short-data_link">
                        <SmallAvatar
                            src={this.store.diary.logo}
                            size={"small"}
                            type={"logo"}
                            alt={this.store.diary.name}
                        />&nbsp;&nbsp;
                        <span>{this.store.diary.name},</span>
                    </Link>
                    &nbsp;&nbsp;
                    <div>{formatDate(this.store.record.created)}</div>
                </div>
                <div className="record-text" dangerouslySetInnerHTML={{__html: this.store.record.text}}/>
                <div className="record-comments">
                    {this.store.comments.map((data: ICommentItem) => {
                            return (
                                <CommentItem comment={data} onUpdate$={this.store.onUpdate$} key={data.commentId} />
                            );
                         })
                    }
                </div>
                {this.store.isCommentFormShow() &&
                    <div className="record-block">
                        <AddComment diaryId={this.store.diary.id} recordId={this.store.record._id} onUpdate$={this.store.onUpdate$} />
                    </div>
                }
            </MainContainer>
        );
    }
}
