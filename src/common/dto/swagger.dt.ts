import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export class Articles {
    articles: Article[];
    articlesCount: number;
}

export class Article {
    @ApiProperty({
        required: true
    })
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export class NewArticle {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export class UpdateArticle {
    title: string;
    description: string;
    body: string;
}


export class Comment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    author: Profile;
}

export class NewComment {
    body: string;
}

export class GenericErrorModel {
    errors: {
        body: string[];
    }
}

export class LoginUser {
    email: string;
    password: string;
}

export class NewUser {
    username: string;
    email: string;
    password: string;
}

export class User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

export class UpdateUser {
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
}