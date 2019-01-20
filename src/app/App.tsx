import * as React from "react";
import { Route, Router, Switch } from "react-router";
import DevTools from "mobx-react-devtools";
import { PublicRoute } from "@components/routes/public-route";
import { AppContext } from "@context";
import { autobind } from "core-decorators";
import { EAppPaths } from "@config/EAppPaths";
import { observer } from "mobx-react";
import { PrivateRoute } from "@components/routes/private-route";
import { Profile } from "@pages/profile";
import { Main } from "@pages/main";
import { Login } from "@pages/login";
import { NotFound } from "@pages/404";
import { UserProfile } from "@components/../pages/user-profile/";
import { Registration } from "@pages/registration";
import { Confirmation } from "@pages/confirmation";
import { CreateRecipe } from "@pages/create-diary";
import { MyDiaries } from "@pages/my-diaries";
import { Diary } from "@pages/diary";
import { Record } from "@pages/record";
import { ForgotPassword } from "@pages/forgot-password";

@autobind
@observer
export class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        AppContext.getUserStore().login();
    }

    render() {
        return (
              <Router history={AppContext.getHistory()}>
                  <>
                      <DevTools />
                      <Switch>
                          <Route exact={true} path={EAppPaths.MAIN} component={Main}/>
                          <Route exact={true} path={EAppPaths.MAIN_PAGES} component={Main}/>
                          <Route path={EAppPaths.CONFIRMATION} component={Confirmation}/>
                          <Route path={EAppPaths.USER} component={UserProfile}/>
                          <Route path={EAppPaths.DIARY} component={Diary}/>
                          <Route path={EAppPaths.RECORD} component={Record}/>
                          <PublicRoute path={EAppPaths.REGISTRATION} component={Registration}/>
                          <PublicRoute path={EAppPaths.LOGIN} component={Login}/>
                          <PublicRoute path={EAppPaths.FORGOT_PASSWORD} component={ForgotPassword}/>
                          <PrivateRoute path={EAppPaths.PROFILE} component={Profile}/>
                          <PrivateRoute path={EAppPaths.CREATE_RECIPE} component={CreateRecipe}/>
                          <PrivateRoute path={EAppPaths.MY_DIARIES} component={MyDiaries}/>
                          <Route path={"*"} component={NotFound}/>
                      </Switch>
                  </>
              </Router>
        );
    }
}
