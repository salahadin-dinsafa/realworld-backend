import { ICreateArticleEle } from "./create-article.interface";

export interface IUpdateArticle {
    article: IUpdateArticleEle
}

interface IUpdateArticleElePartial extends Omit<ICreateArticleEle, 'tagList'> { }

interface IUpdateArticleEle extends Partial<IUpdateArticleElePartial> { }