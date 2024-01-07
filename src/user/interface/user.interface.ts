export interface IUser {
    user: IUserElement
}

export interface IUserElement {
    email: string
    token: string;
    username: string;
    bio: string;
    image: string;
}