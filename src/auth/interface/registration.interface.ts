export interface IRegistration {
    user: IRegistrationElement
}

export interface IRegistrationElement {
    username: string;
    email: string;
    password: string;
    bio?: string;
    image?: string;
}