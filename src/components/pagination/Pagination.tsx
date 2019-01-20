import * as React from "react";
import { IPaginationProps } from "./IPaginationProps";
import "./Pagination.scss";
import { AppContext } from "@context";

export class Pagination extends React.Component<IPaginationProps> {

    render() {
        const quantity = Math.ceil(this.props.quantityArticles / 10);
        const arr = [];
        for (let i = 0; i < quantity; i++) {
            arr.push(i);
        }
        return(
            <div className="pagination">
                {arr.map((data) => {
                    return(
                        <div
                            key={data}
                            className={`pagination__item ${this.props.currentPage === data + 1 ? "pagination__item--active" : ""}`}
                            onClick={() => this.onCLick(data)}
                        >
                            {data + 1}
                        </div>
                    );
                })}
            </div>
        );
    }

    private onCLick(page: number): void {
        AppContext.getHistory().push(`/pages/${page + 1}`);
        this.props.onUpdate$.next();
    }
}
