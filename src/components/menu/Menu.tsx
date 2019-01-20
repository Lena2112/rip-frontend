import * as React from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { MenuStore } from "@components/menu/MenuStore";
import { IDishCategory } from "@interfaces/";
import { MenuItem } from "@components/menu-item";
import "./Menu.scss";
import { IMenuProps } from "@components/menu/IMenuProps";

@observer
@autobind
export class Menu extends React.Component<IMenuProps> {
    private readonly store = new MenuStore();

    componentDidMount(): void {
        this.store.getCategories();
    }

    render(): React.ReactNode {
        return (
            <div className={"menu"}>
                {this.store.menuList.map((item: IDishCategory) => {
                    return(
                        <MenuItem
                            key={item._id}
                            title={item.title}
                            link={item.link}
                            current={this.store.getCurrentCategory(this.props.current)}
                        />
                    );
                })}
            </div>
        );
    }
}
