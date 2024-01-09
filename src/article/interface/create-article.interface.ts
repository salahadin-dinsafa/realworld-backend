export interface ICreateArticleEle {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}

export interface ICreateArticle{
    article: ICreateArticleEle
}