import * as React from "react";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import { AvatarPanel } from "@components/avatar-panel";
import { ChangeLogin } from "@components/change-data/change-login";
import "./Profile.scss";
import { ChangeEmail } from "@components/change-data/change-email";
import Helmet from "react-helmet";
import { ChangePassword } from "@components/change-data/change-password";
import { autobind } from "core-decorators";
import { ProfileStore } from "./ProfileStore";
import { Button } from "@components/button";
import { PageTitle } from "@components/page-title";
import { LeftBlock } from "@components/left-block";
import { RightBlock } from "@components/right-block";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";

@observer
@autobind
export class Profile extends React.Component {
    private readonly store = new ProfileStore();

    componentDidMount(): void {
        this.store.getUser();
        AppContext.getStore().onUpdate$.subscribe(this.store.getUser);
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Личный кабинет</title>
                </Helmet>
                <PageTitle title={`Личный кабинет пользователя ${this.store.user.login}`} />
                <div className="profile-container">
                   <LeftBlock>
                       <AvatarPanel src={this.store.user.avatar} />
                       <Button
                            title={"Создать рецепт"}
                            isDisable={false}
                            onClick={this.goToCreationRecipe}
                            className={"button-item"}
                       />
                   </LeftBlock>
                    <RightBlock>
                        <ChangeLogin currentLogin={this.store.user.login} />
                        <ChangeEmail currentEmail={this.store.user.email} />
                        <ChangePassword/>
                    </RightBlock>
                </div>
            </MainContainer>
        );
    }

    private goToCreationRecipe(): void {
        AppContext.getHistory().push(EAppPaths.CREATE_RECIPE);
    }
}
