import { IProfileEle } from "src/profile/interfaces/profile.interface";

export interface IComment {
    comment: ICommentEle
}

export interface ICommentEle {
    id: number;
    createAt: Date;
    updatedAt: Date;
    body: string;
    author: IProfileEle
}