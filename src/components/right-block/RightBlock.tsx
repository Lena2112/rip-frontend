import * as React from "react";
import "./RightBlock.scss";

export class RightBlock extends React.PureComponent {
    render() {
        return(
            <div className="right-block">
                {this.props.children}
            </div>
        );
    }
}
