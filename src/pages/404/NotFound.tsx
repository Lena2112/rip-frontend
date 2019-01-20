import * as React from "react";
import { MainContainer } from "../../components/main-container";
import Helmet from "react-helmet";

export class NotFound extends React.Component {
    render() {
        return(
            <MainContainer>
                <Helmet>
                    <title>Страница не найдена</title>
                </Helmet>
                <h1>Страница не найдена</h1>
            </MainContainer>
        );
    }
}
