import * as React from "react";
import "./Header.scss";
import { AppContext } from "@context";
import { observer } from "mobx-react";
import { EAppPaths } from "@config/EAppPaths";
import { IHeaderProps } from "./IHeaderProps";
import { autobind } from "core-decorators";
import { HeaderStore } from "./";
import { ConfirmPopup } from "@components/popups/confirm-popup";
import { HeaderLink } from "@components/header-link";
import { DropDown } from "@components/dropdown";
import { Logo } from "@components/logo";

@observer
@autobind
export class Header extends React.Component<IHeaderProps> {
    private readonly store = new HeaderStore();

    componentDidMount(): void {
        this.store.logout$.subscribe(this.store.showPopup);
    }

    render() {
        return(
            <>
                <div className={"header"}>
                    <div className={"header__content"}>
                        <Logo />
                        <div className={"header__controls"}>
                            {!AppContext.getUserStore().isLoggedIn && <HeaderLink path={EAppPaths.REGISTRATION} name={"Регистрация"} current={this.props.current}/>}
                            {!AppContext.getUserStore().isLoggedIn && <HeaderLink path={EAppPaths.LOGIN} name={"Вход"} current={this.props.current}/>}
                            {AppContext.getUserStore().isLoggedIn &&
                            <DropDown
                                current={AppContext.getUserStore().user.login}
                                items={this.store.getDropDownItems()}
                                className={"header__dropdown"}
                                classNameContent={"header__dropdown__content"}
                            />
                            }
                        </div>
                    </div>
                </div>
                {this.store.isLogoutPopupShown &&
                    <ConfirmPopup
                        title={"Вы действтельно хотите выйти?"}
                        onSubmit={this.store.logout}
                        onCancel={this.store.hidePopup}
                    />
                }
            </>
        );
    }
}
