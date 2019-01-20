import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IPushNotificationProps } from "./IPushNotificationProps";
import "./PushNotification.scss";
import { PushNotificationStore } from "./PushNotificationStore";

@observer
@autobind
export class PushNotification extends React.Component<IPushNotificationProps> {
    private readonly store = new PushNotificationStore();

    componentDidMount(): void {
        this.store.isHidden = this.props.isHidden;
    }

    componentDidUpdate(): void {
        this.store.isHidden = this.props.isHidden;
    }

    render() {
        return(
            <div className="push-notification" data-hidden={this.store.isHidden}>
                <div className="push-notification_title">{this.props.title}</div>
                <div className="push-notification_closeIcon" onClick={this.props.onClick} />
            </div>
        );
    }
}
