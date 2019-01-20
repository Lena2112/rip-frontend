export interface IMyArticleItemProps {
    created: string;
    name: string;
    articleId: string;

    onShowPopup(articleId: string): void;

    onEditArticle(articleId: string): void;
}
