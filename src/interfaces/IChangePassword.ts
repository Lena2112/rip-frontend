export interface IChangePassword {
    token: string;
    oldPassword: string;
    password: string;
    repeatPassword: string;
}
