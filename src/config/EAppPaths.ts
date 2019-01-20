export enum EAppPaths {
    MAIN = "/",
    MAIN_PAGES = "/pages/:pageNumber",
    FORGOT_PASSWORD = "/forgot-password",
    REGISTRATION = "/registration",
    LOGIN = "/login",
    PROFILE = "/profile",
    EDIT_ABOUT_ME = "/edit-about-me",
    EDIT_CONTACTS = "/edit-contacts",
    CREATE_ARTICLE = "/create-article",
    MY_ARTICLES = "/my-articles",
    USER = "/user/:userId",
    CONFIRMATION = "/confirmation/:login/:activationCode",
    CREATE_RECIPE = "/create-recipe",
    EDIT_DIARY = "/edit-diary/:diaryId",
    ADD_RECORD = "/add-record/:diaryId",
    MY_DIARIES = "/my-diaries",
    DIARY = "/diary/:name/:diaryId",
    RECORD = "/record/:name/:diaryId",
}