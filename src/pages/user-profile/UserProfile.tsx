import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { UserProfileStore } from "./UserProfileStore";
import { MainContainer } from "@components/main-container";
import Helmet from "react-helmet";
import { PageTitle } from "@components/page-title";
import { LeftBlock } from "@components/left-block";
import { RightBlock } from "@components/right-block";
import "./UserProfile.scss";
import { InformationCard } from "@components/information-card";
import { Link } from "react-router-dom";

const defaultAvatar = require("./img/default-avatar.jpg");

@observer
@autobind
export class UserProfile extends React.Component {
    private readonly store = new UserProfileStore();

    componentDidMount() {
        this.store.getUserProfile();
    }

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>{`Профиль юзера ${this.store.userProfile.login}`}</title>
                </Helmet>
                <PageTitle title={`Профиль юзера ${this.store.userProfile.login}`} />
                <div className="user-profile">
                    <LeftBlock>
                        <img
                            src={this.store.userProfile.avatar}
                            alt={this.store.userProfile.login}
                            className="user-profile__avatar"
                            onError={this.onLogoLoadError}
                        />
                    </LeftBlock>
                    <RightBlock>
                        <InformationCard
                            title={"Краткая информация"}
                            data={this.store.shortInfo}
                        />
                        {this.store.userProfile.articles && <div className="information-card_header">Добавленные статьи</div>}
                        {this.store.userProfile.articles.map((data: {
                            _id: string;
                            name: string;
                        }) => {
                            return(
                                <div key={data._id} className={"information-card_content__line"}>
                                    <Link to={`/article/${data._id}`} className={"user-profile__link"}>{data.name}</Link>
                                </div>
                            );
                        })}
                    </RightBlock>
                </div>
            </MainContainer>
        );
    }

    private onLogoLoadError(event: React.SyntheticEvent<HTMLImageElement>): void {
        const target = event.target as HTMLImageElement;
        if (!target) {
            return;
        }
        target.setAttribute("src", defaultAvatar);
    }
}
