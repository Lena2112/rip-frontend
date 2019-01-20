import { last } from "lodash";

export const isTokenValid = (token: string): boolean => {
    if (!token) {
        return false;
    }
    return token.length === 300;
};

export const formatDate = (created: string): string => {
    const timestamp = Number(created);
    const date = new Date(timestamp);
    const locale = "ru";
    const month = date.toLocaleString(locale, {
        month: "short",
    });
    const time = date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    });

    return `${date.getDate()} ${month} ${date.getFullYear()} в ${time}`;
};

export const getTranslateRoleName = (englishName: string): string => {
    let role = "";
    switch (englishName) {
        case "admin": {
            role = "Админ";
            break;
        }
        case "author": {
            role = "Автор";
            break;
        }
        case "user": {
            role = "Обычный пользователь";
            break;
        }
        default: {
            role = "Обычный пользователь";
            break;
        }
    }
    return role;
};

export const getPrivateDiaryStatusText = (value: boolean): string => {
    return value ? "Приватный" : "Публичный";
};

export const reversedList = <T>(data: T[]): T[]  => {
    return data.slice().reverse();
};

export const getId = (): string => {
    const url = window.location.pathname;
    const array = url.split("/");
    const id = last(array);
    if (!id) {
        return "";
    }
    return id;
};
