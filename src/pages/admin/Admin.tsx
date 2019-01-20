import * as React from "react";
import { MainContainer } from "@components/main-container";
import { observer } from "mobx-react";
import Helmet from "react-helmet";
import { UserList } from "@components/user-list";
import { PageTitle } from "@components/page-title";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { Button } from "@components/button";

@observer
export class Admin extends React.Component {
    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Админ панель</title>
                </Helmet>
                <PageTitle title={"Админ панель"} />
                <UserList />
                <div style={{marginBottom: 20}}>
                    <Button
                        title={`Редактировать раздел "Обо мне"`}
                        isDisable={false}
                        onClick={this.getToEditAboutMe}
                    />
                </div>
                <Button
                    title={`Редактировать раздел "Контакты"`}
                    isDisable={false}
                    onClick={this.getToEditContacts}
                />
            </MainContainer>
        );
    }

    private getToEditAboutMe(): void {
        AppContext.getHistory().push(EAppPaths.EDIT_ABOUT_ME);
    }

    private getToEditContacts(): void {
        AppContext.getHistory().push(EAppPaths.EDIT_CONTACTS);
    }
}
