import * as React from "react";
import { observer } from "mobx-react";
import { IUserListRowProps } from "./UserListRowProps";
import { autobind } from "core-decorators";
import { UserListRowView } from "@components/user-list-row-view/";

@observer
@autobind
export class UserListRow extends React.Component<IUserListRowProps> {
    render() {
        return(
            <UserListRowView data={this.props.data} onClick={this.props.onClick}/>
        );
    }
}
