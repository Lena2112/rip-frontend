import createBrowserHistory from "history/createBrowserHistory";
import { Store, UserStore } from "@app/stores/";
import { FormStore } from "@components/form-store";

export namespace AppContext {
    const history = createBrowserHistory();
    const store = new Store();
    const formStore = new FormStore();
    const userStore = new UserStore();

    export function getHistory() {
        return history;
    }

    export function getStore(): Store {
        return store;
    }

    export function getFormStore(): FormStore {
        return formStore;
    }

    export function getUserStore(): UserStore {
        return userStore;
    }
}
