import { IProfileEle } from "src/profile/interfaces/profile.interface";

export interface IArticleEle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: IProfileEle
}

export interface IArticle {
    article: IArticleEle
}