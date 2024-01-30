import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class Profile {
    @ApiProperty({
        required: true
    })
    username: string;
    @ApiProperty({
        required: true
    })
    bio: string;
    @ApiProperty({
        required: true
    })
    image: string;
    @ApiProperty({
        required: true
    })
    following: boolean;
}

export class Article {
    @ApiProperty({
        required: true
    })
    slug: string;
    @ApiProperty({
        required: true
    })
    title: string;
    @ApiProperty({
        required: true
    })
    description: string;
    @ApiProperty({
        required: true
    })
    body: string;
    @ApiProperty({
        required: true
    })
    tagList: string[];
    @ApiProperty({
        required: true
    })
    createdAt: Date;
    @ApiProperty({
        required: true
    })
    updatedAt: Date;
    @ApiProperty({
        required: true
    })
    favorited: boolean;
    @ApiProperty({
        required: true
    })
    favoritesCount: number;
    @ApiProperty({
        required: true,
        type: Profile
    })
    author: Profile;
}

export class SingleArticle {
    @ApiProperty({
        required: true,
        type: Article
    })
    article: Article
}

export class Articles {
    @ApiProperty({
        required: true,
        type: [Article],
    })
    articles: Article[];

    @ApiProperty({
        required: true,
    })
    articlesCount: number;
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

class Error {
    @ApiProperty({
        required: true
    })
    body: string[]
}

export class GenericErrorModel {
    @ApiProperty({
        required: true,
        type: Error
    })
    errors: Error
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