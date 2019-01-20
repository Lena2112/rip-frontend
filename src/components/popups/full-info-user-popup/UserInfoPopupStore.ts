import { autobind } from "core-decorators";
import { IDropDownItem } from "@components/dropdown-item";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { get } from "lodash";
import { IUserInfoPopupProps } from "@components/popups/full-info-user-popup/";
import { getTranslateRoleName } from "@helpers/helpers";

@autobind
export class UserInfoPopupStore {
    private readonly transport = new Transport();
    private readonly dropdownItems: IDropDownItem[] = [
        {
            text: getTranslateRoleName("user"),
            handler: () => this.changeRole("user")
        },
        {
            text: getTranslateRoleName("author"),
            handler: () => this.changeRole("author")
        },
    ];
    private readonly props: IUserInfoPopupProps;
    constructor(props: IUserInfoPopupProps) {
        this.props = props;
    }

    getActivationsState(code: string): string {
        let msg = "";
        if (code) {
            msg = "Пользователь не подтвержден";
        }
        msg = "Пользователь подтвержден";
        return msg;
    }

    getIsBlockedMsg(value: boolean): string {
        let msg = "Пользователь не заблокирован";
        if (value) {
            msg = "Пользователь заблокирован";
        }
        return msg;
    }

    getIsDeleteddMsg(value: boolean): string {
        let msg = "Пользователь не удален";
        if (value) {
            msg = "Пользователь удален";
        }
        return msg;
    }

    getDropdownItems(): IDropDownItem[] {
        return this.dropdownItems;
    }

    changeRole(role: string): void {
        const token = AppContext.getUserStore().getToken();
        const userId = this.props.data._id;
        this.transport.changeRole(token, userId, role).then((response) => {
            const success = get(response.data, "success");
            if (success) {
                this.props.onUpdateUser$.next();
            }
        });
    }
}
