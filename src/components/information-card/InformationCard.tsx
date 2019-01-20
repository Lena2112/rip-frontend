import * as React from "react";
import "./InformationCard.scss";
import { IInformationCardProps } from "./IInformationCardProps";
import { IInformationCardChildren } from "./IInformationCardChildren";
import { observer } from "mobx-react";
import { SFC } from "react";

export const InformationCard = observer<SFC<IInformationCardProps>>(({
    title,
    data,
}) => {
    return(
        <div className="information-card">
            <div className="information-card_header">{title}</div>
            <div className="information-card_content">
                {data.map((item: IInformationCardChildren, index: number) => {
                    return(
                        <div key={index} className="information-card_content__line">
                            <div className="information-card_content__half">{item.title}</div>
                            <div className="information-card_content__half">{item.message}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
