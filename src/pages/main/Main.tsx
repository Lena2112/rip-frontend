import * as React from "react";
import Helmet from "react-helmet";
import { MainContainer } from "@components/main-container";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";

@observer
@autobind
export class Main extends React.Component {

    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Главная</title>
                </Helmet>
            </MainContainer>
        );
    }
}
