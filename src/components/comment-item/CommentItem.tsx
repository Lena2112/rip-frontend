import * as React from "react";
import { ICommentItemProps } from "./ICommentItemProps";
import "./CommentItem.scss";
import { Link } from "react-router-dom";
import { formatDate } from "@helpers/helpers";
import { autobind } from "core-decorators";
import { AppContext } from "@context";
import { SmallAvatar } from "@components/small-avatar";
import { CommentItemStore } from "@components/comment-item/CommentItemStore";
import { observer } from "mobx-react";

const CKEditor = require("@ckeditor/ckeditor5-react");
const ClassicEditor  = require("@ckeditor/ckeditor5-build-classic");

@observer
@autobind
export class CommentItem extends React.Component<ICommentItemProps> {
    private readonly store = new CommentItemStore();

    render() {
        return(
            <div className="comment">
                <div className="comment__header">
                    <SmallAvatar
                        src={this.props.comment.avatar}
                        alt={this.props.comment.login}
                        type={"avatar"}
                        size={"small"}
                    />
                    <div className="comment__header_info">
                        <div>
                            <Link
                                to={`/user/${this.props.comment.userId}`}
                                className="comment__header_name"
                            >
                                {this.props.comment.login}
                            </Link>
                        </div>
                        <div className="comment__header_date">
                            {!this.props.comment.updated ? formatDate(this.props.comment.created) : `${formatDate(this.props.comment.updated)} (изменено)`}
                        </div>
                    </div>
                    {this.isControlsShow() &&
                        <div className="comment-controls">
                            <div className="control-icon delete-comment" onClick={this.deleteComment}/>
                            {!this.store.isEdited && <div className="control-icon  edit-comment" onClick={() => this.store.onEditComment(this.props.comment.text)}/>}
                        </div>
                    }
                </div>
                {this.store.isEdited ?
                    <>
                        <CKEditor
                            editor={ClassicEditor}
                            data={this.store.textEditor}
                            onChange={(event: any, editor: any) => {
                                this.store.onChangeTextEditor(editor.getData());
                            }}
                            config={
                                {
                                    toolbar: [ "heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote" ],
                                }
                            }
                        />
                        <div className="edit-panel">
                            <div className="edit-panel_button" onClick={this.store.cancelEdit}>Отмена</div>
                            <div className="edit-panel_button" onClick={this.saveComment}>Сохранить</div>
                        </div>
                    </> :
                    <div
                        className="comment__content"
                        dangerouslySetInnerHTML={{__html: this.props.comment.text}}
                    />
                }
            </div>
        );
    }

    private deleteComment(): void {
        const commentId = this.props.comment.commentId;
        const recordId = this.props.comment.recordId;
        const diaryId = this.props.comment.diaryId;
        const onUpdate$ = this.props.onUpdate$;
        this.store.deleteComment(diaryId, recordId, commentId, onUpdate$);
    }

    private saveComment(): void {
        const commentId = this.props.comment.commentId;
        const recordId = this.props.comment.recordId;
        const diaryId = this.props.comment.diaryId;
        const onUpdate$ = this.props.onUpdate$;
        this.store.saveEditedComment(diaryId, recordId, commentId, onUpdate$);
    }

    private isControlsShow(): boolean {
        const userId = AppContext.getUserStore().getUserId();
        return userId === this.props.comment.userId;
    }
}
