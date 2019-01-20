import axios, { AxiosInstance } from "axios";
import { autobind } from "core-decorators";
import { ApiRoutes } from "./ApiRotes";
import * as qs from "qs";
import {
    IChangePassword,
    IAddCommentData,
    IDeleteUser,
    IForgotPassword,
    IUserDataLogin,
    IUserDataSignUp, IDiaryEdit, IDeleteRecord
} from "@interfaces/";
import { IEditRecord } from "../../interfaces/IEditRecord";
import { TFlagCheckEmail } from "@pages/registration/RegistrationStore";

@autobind
export class Transport {
    private readonly instance: AxiosInstance;
    private readonly  config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    constructor() {
        this.instance = axios.create();
    }

    async sendUserData(data: IUserDataSignUp) {
        return this.instance.post(ApiRoutes.ADD_USER, qs.stringify(data), this.config);
    }

    async checkLoginExist(login: string, flag: TFlagCheckEmail) {
        return this.instance.get(ApiRoutes.CHECK_LOGIN_EXIST
            .replace(":login", login)
            .replace(":flag", flag));
    }

    async checkEmailExist(email: string, flag: TFlagCheckEmail) {
        return this.instance.get(ApiRoutes.CHECK_EMAIL_EXIST
            .replace(":email", email)
            .replace(":flag", flag));
    }

    async confirmCode(login: string, code: string) {
        return this.instance.get(ApiRoutes.CONFIRM_CODE.replace(":login", login).replace(":activationCode", code));
    }

    async login(data: IUserDataLogin) {
        return this.instance.post(ApiRoutes.LOGIN, qs.stringify(data), this.config);
    }

    async resendCode(email: string) {
        return this.instance.put(ApiRoutes.RESEND_CODE, qs.stringify({email}));
    }

    async getUsers(token: string) {
        return this.instance.post(ApiRoutes.GET_USERS, qs.stringify({token}), this.config);
    }

    async getUser(token: string) {
        return this.instance.post(ApiRoutes.GET_USER, qs.stringify({token}), this.config);
    }

    async getUserById(token: string, id: string) {
        return this.instance.post(ApiRoutes.GET_USER_BY_ID, qs.stringify({token, id}), this.config);
    }

    async changeLogin(token: string, login: string) {
        return this.instance.put(ApiRoutes.CHANGE_LOGIN, qs.stringify({token, login}));
    }

    async changeEmail(token: string, email: string) {
        return this.instance.put(ApiRoutes.CHANGE_EMAIL, qs.stringify({token, email}));
    }

    async changePassword(data: IChangePassword) {
        return this.instance.put(ApiRoutes.CHANGE_PASSWORD, qs.stringify(data));
    }

    async forgotPassword(email: IForgotPassword) {
        return this.instance.put(ApiRoutes.FORGOT_PASSWORD, qs.stringify(email));
    }

    async deleteUser(data: IDeleteUser) {
        return this.instance.put(ApiRoutes.DELETE_USER, qs.stringify(data));
    }

    async uplodaAvatar(formData: FormData) {
        return this.instance.post(ApiRoutes.UPLOAD_AVATAR, formData, {headers: { "Content-Type": "multipart/form-data" }});
    }

    async deleteAvatar(token: string) {
        return this.instance.put(ApiRoutes.DELETE_AVATAR, qs.stringify({token}));
    }

    async blockUser(token: string, id: string) {
        return this.instance.put(ApiRoutes.BLOCK_USER, qs.stringify({token, id}));
    }

    async unblockUser(token: string, id: string) {
        return this.instance.put(ApiRoutes.UNBLOCK_USER, qs.stringify({token, id}));
    }

    async changeRole(token: string, userId: string,  newRole: string) {
        return this.instance.put(ApiRoutes.CHANGE_ROLE, qs.stringify({token, userId, newRole}));
    }

    async uploadArticle(token: string, name: string, text: string) {
        return this.instance.post(ApiRoutes.UPLOAD_ARTICLE, qs.stringify({token, name, text}));
    }

    async editArticle(token: string, articleId: string,  name: string, text: string) {
        return this.instance.put(ApiRoutes.EDIT_ARTICLE, qs.stringify({token, articleId,  name, text}));
    }

    async getArticleById(articleId: string) {
        return this.instance.get(ApiRoutes.GET_ARTICLE_BY_ID.replace(":articleId", articleId));
    }

    async addComment(data: IAddCommentData) {
        return this.instance.post(ApiRoutes.ADD_COMMENT, qs.stringify(data));
    }

    async getLimitedComments(diaryId: string, recordId: string) {
        return this.instance.get(ApiRoutes.GET_LIMITED_COMMENTS
            .replace(":diaryId", diaryId)
            .replace(":recordId", recordId));
    }

    async deleteComment(token: string, diaryId: string, recordId: string, commentId: string) {
        return this.instance.post(ApiRoutes.DELETE_COMMENT, qs.stringify({token, diaryId, recordId, commentId}));
    }

    async editComment(token: string, diaryId: string, recordId: string, commentId: string, text: string) {
        return this.instance.post(ApiRoutes.EDIT_COMMENT, qs.stringify({token, diaryId, recordId, commentId, text}));
    }

    async getMyArticles(token: string) {
        return this.instance.post(ApiRoutes.MY_ARTICLES, qs.stringify({token}));
    }

    async deleteArticle(token: string, articleId: string) {
        return this.instance.post(ApiRoutes.DELETE_ARTICLE, qs.stringify({token, articleId}));
    }

    async uploadAboutMe(token: string, text: string) {
        return this.instance.put(ApiRoutes.EDIT_ABOUT_ME, qs.stringify({token, text}));
    }

    async deleteDiary(token: string, diaryId: string, name: string) {
        return this.instance.post(ApiRoutes.DELETE_DIARY, qs.stringify({token, diaryId, name}));
    }

    async getAboutMe() {
        return this.instance.get(ApiRoutes.GET_ABOUT_ME);
    }

    async getContacts() {
        return this.instance.get(ApiRoutes.GET_CONTACTS);
    }

    async uploadContacts(token: string, text: string) {
        return this.instance.put(ApiRoutes.EDIT_CONTACTS, qs.stringify({token, text}));
    }

    async sendEmail(email: string, text: string) {
        return this.instance.post(ApiRoutes.SEND_EMAIL, qs.stringify({email, text}));
    }

    async getRole(token: string) {
        return this.instance.post(ApiRoutes.GET_ROLE, qs.stringify({token}));
    }

    async getUserProfile(userId: string) {
        return this.instance.get(ApiRoutes.GET_USER_PROFILE.replace(":userId", userId));
    }

    async createDiary(token: string, name: string, description: string, logo: string) {
        return this.instance.post(ApiRoutes.CREATE_DIARY, qs.stringify({token, name, description, logo}));
    }

    async getMyDiaries(token: string) {
        return this.instance.post(ApiRoutes.GET_MY_DIARIES, qs.stringify({token}));
    }

    async getAllDiaries() {
        return this.instance.get(ApiRoutes.GET_ALL_DIARIES);
    }

    async getNumberOfDiary(diaryId: string, token: string) {
        return this.instance.post(ApiRoutes.DIARY_SHORT_DATA, qs.stringify({diaryId, token}));
    }

    async addRecord(token: string, diaryId: string, name: string, text: string) {
        return this.instance.post(ApiRoutes.ADD_RECORD, qs.stringify({token, diaryId, name, text}));
    }

    async getRecords(diaryId: string) {
        return this.instance.get(ApiRoutes.GET_RECORDS.replace(":diaryId", diaryId));
    }

    async getDiaryData(name: string, diaryId: string) {
        return this.instance.get(ApiRoutes.GET_DIARY_DATA
            .replace(":name", name)
            .replace(":diaryId", diaryId));
    }

    async getRecord(diaryName: string, recordId: string) {
        return this.instance.get(ApiRoutes.GET_RECORD
            .replace(":diaryName", diaryName)
            .replace(":recordId", recordId));
    }

    async getEditRecord(diaryId: string, recordId: string) {
        return this.instance.get(ApiRoutes.GET_EDIT_RECORD
            .replace(":diaryId", diaryId)
            .replace(":recordId", recordId));
    }

    async editRecord(data: IEditRecord) {
        return this.instance.post(ApiRoutes.EDIT_RECORD, qs.stringify(data));
    }

    async getComments(diaryName: string, recordId: string) {
        return this.instance.get(ApiRoutes.GET_COMMENTS
            .replace(":diaryName", diaryName)
            .replace(":recordId", recordId));
    }

    async editDiaryData(diaryId: string) {
        return this.instance.get(ApiRoutes.GET_EDIT_DIARY.replace(":diaryId", diaryId));
    }

    async editDiary(data: IDiaryEdit) {
        return this.instance.post(ApiRoutes.EDIT_DIARY, qs.stringify(data));
    }

    async deleteRecord(data: IDeleteRecord) {
        return  this.instance.post(ApiRoutes.DELETE_RECORD, qs.stringify(data));
    }

    async getCategories() {
        return this.instance.get(ApiRoutes.GET_CATEGORIES);
    }

    async createRecipe(formData: FormData) {
        return this.instance.post(ApiRoutes.CREATE_RECIPE, formData);
    }
}
