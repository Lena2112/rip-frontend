export interface IUserProfile {
    login: string;
    avatar: string;
    created: string;
    articles: Array<{
        _id: string;
        name: string;
    }>;
}
