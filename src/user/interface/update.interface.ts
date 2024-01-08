export interface IUpdate {
    user: IUpdateEle
}

export interface IUpdateEle {
    email?: string;
    username?: string;
    password?: string;
    image?: string;
    bio?: string;
}