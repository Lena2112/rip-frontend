import * as React from "react";
import { autobind } from "core-decorators";
import { IDropDownProps } from "./IDropDownProps";
import { DropDownStore } from "./DropDownStore";
import { IDropDownItem } from "@components/dropdown-item";
import { DropDownItem } from "@components/dropdown-item/";
import { observer } from "mobx-react";
import "./DropDown.scss";

@observer
@autobind
export class DropDown extends React.Component<IDropDownProps> {
    private readonly store = new DropDownStore();

    render() {
        return(
            <div className={`dropdown ${!this.props.className ? "" : this.props.className}`} onClick={this.store.switch}>
                <div className="dropdown__current">
                    <div className="dropdown__current_text">{this.props.current}</div>
                    <div className={`dropdown__current_icon ${this.store.isOpened ? "dropdown__current--opened" : ""}`}/>
                </div>
                {this.store.isOpened &&
                    <div className={`dropdown__content ${!this.props.classNameContent ? "" : this.props.classNameContent}`}>
                        {this.props.items.map((data: IDropDownItem, key: number) => {
                            return (
                                <DropDownItem
                                    item={data}
                                    key={key}
                                    isActive={this.props.current === data.text}
                                    className={!this.props.classNameItem ? "" : this.props.classNameItem}
                                />
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}
