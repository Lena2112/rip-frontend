import { observable } from "mobx";
import { autobind } from "core-decorators";
import { Subject } from "rxjs/internal/Subject";
import { AppContext } from "@context";
import { EAppPaths } from "@config/EAppPaths";
import { IDropDownItem } from "@components/dropdown-item/IDropDownItem";

@autobind
export class HeaderStore {
    @observable private _isDropdownShown = false;
    @observable private readonly _logout$ = new Subject<void>();
    @observable private _isLogoutPopupShown = false;

    private readonly itemsList: IDropDownItem[] = [
        {
            text: "Личный кабинет",
            handler: () => AppContext.getHistory().push(EAppPaths.PROFILE)
        },
        {
            text: "Выход",
            handler: () => this._logout$.next()
        },
    ];

    get isDrowdownShown(): boolean {
        return this._isDropdownShown;
    }

    set isDropdownShown(value: boolean) {
        this._isDropdownShown = value;
    }

    get logout$(): Subject<void> {
        return this._logout$;
    }

    get isLogoutPopupShown(): boolean {
        return this._isLogoutPopupShown;
    }

    set isLogoutPopupShown(value: boolean) {
        this._isLogoutPopupShown = value;
    }

    openDropdown(): void {
        this._isDropdownShown = !this._isDropdownShown;
    }

    hidePopup(): void {
        this.isLogoutPopupShown = false;
    }

    showPopup(): void {
        this.isLogoutPopupShown = true;
    }

    logout(): void {
        AppContext.getUserStore().logout();
        this.hidePopup();
    }

    getDropDownItems(): IDropDownItem[] {
        return this.itemsList;
    }
}
