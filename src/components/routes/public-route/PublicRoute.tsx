import * as React from "react";
import { observer } from "mobx-react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { autobind } from "core-decorators";
import { IPublicRouteProps } from "./IPublicRouteProps";
import { AppContext } from "@context";

@observer
@autobind
export class PublicRoute extends React.Component<IPublicRouteProps> {
    render() {
        return(
            <>
                <Route
                    render={(props: RouteComponentProps) => {
                        return AppContext.getUserStore().getToken() ? (
                            <Redirect exact={true} push={true} to={"/"} />
                        ) : (
                            React.createElement(this.props.component, {...props})
                        );
                    }}
                />
            </>
        );
    }
}
