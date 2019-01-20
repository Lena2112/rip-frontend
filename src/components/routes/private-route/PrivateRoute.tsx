import * as React from "react";
import { observer } from "mobx-react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { autobind } from "core-decorators";
import { IPrivateRouteProps } from "./IPrivateRouteProps";
import { RouteStore } from "@components/routes/store";
import { AppContext } from "@context";

@observer
@autobind
export class PrivateRoute extends React.Component<IPrivateRouteProps> {
    private readonly store = new RouteStore();

    componentDidMount(): void {
        this.store.getUser();
    }

    render() {
        return(
            <>
                {this.store.success && AppContext.getUserStore().isLoggedIn &&
                    <Route
                        render={(props: RouteComponentProps) => {
                            return AppContext.getUserStore().getToken() ? (
                                React.createElement(this.props.component, {...props})
                            ) : (
                                <Redirect exact={true} push={true} to={"/"} />
                            );
                        }}
                    />
                }
            </>
        );
    }
}
