import * as React from "react";
import "./LeftBlock.scss";

export class LeftBlock extends React.PureComponent {
    render() {
        return(
            <div className="left-block">
                {this.props.children}
            </div>
        );
    }
}
