import * as React from "react";
import { IRecordItemProps } from "./IRecordItemProps";
import "./RecordItem.scss";
import { RecordItemHeader } from "@components/record-item-header";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { AddComment } from "@components/add-comment";
import { RecordItemStore } from "@components/record-item/RecordItemStore";
import { CommentItem, ICommentItem } from "@components/comment-item";
import { isEmpty } from "lodash";
import { ESocketEvents } from "@services/socket";

@observer
@autobind
export class RecordItem extends React.Component<IRecordItemProps> {
    private readonly store = new RecordItemStore();

    componentDidMount(): void {
        this.store.getComments(this.props.diaryId, this.props.recordData._id);
        this.props.on(ESocketEvents.UPDATE_COMMENTS, (data) => {
            if (data === this.props.recordData._id) {
                this.store.getComments(this.props.diaryId, this.props.recordData._id);
            }
        });
        this.store.onUpdate$.subscribe(() => {
            this.props.emit(ESocketEvents.ADD_COMMENT, this.props.recordData._id);
        });
    }

    render(): React.ReactNode {
        return (
            <div className="record-item">
                <Link to={`/record/${this.props.diaryName}/${this.props.recordData._id}`}>
                    <RecordItemHeader
                        updated={this.props.recordData.updated}
                        created={this.props.recordData.created}
                        diaryName={this.props.diaryName}
                        diaryLogo={this.props.dairyLogo}
                    />
                    <div className="record-item_content">
                        <h3 className="record-item_text-line">{this.props.recordData.name}</h3>
                        <div className="record-item_text-line" dangerouslySetInnerHTML={{__html: this.props.recordData.text}}/>
                    </div>
                </Link>
                {!isEmpty(this.store.comments) && <h4 style={{padding: "10px 20px", borderBottom: "2px solid #000"}}>Комментарии</h4>}
                <div className="record-item_comments">
                    {this.store.comments.map((data: ICommentItem) => {
                        return (
                            <CommentItem
                                comment={data}
                                onUpdate$={this.store.onUpdate$}
                                key={data.commentId}
                            />
                        );
                    })
                    }
                </div>
                {this.store.isCommentFormShow() &&
                    <div className="record-item_block">
                        <AddComment
                            diaryId={this.props.diaryId}
                            recordId={this.props.recordData._id}
                            onUpdate$={this.store.onUpdate$}
                        />
                    </div>
                }
            </div>
        );
    }
}
