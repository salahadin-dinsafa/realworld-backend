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

export class SingleProfile {
    @ApiProperty({
        required: true,
        type: Profile
    })
    profile: Profile
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

export class UpdateArticle {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    body: string;
}


export class Comment {
    @ApiProperty({
        required: true
    })
    id: number;
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
    body: string;
    @ApiProperty({
        required: true,
        type: Profile
    })
    author: Profile;
}

export class SingleComment {
    @ApiProperty({
        required: true,
        type: Comment
    })
    comment: Comment;
}

export class Comments {
    @ApiProperty({
        required: true,
        type: [Comment]
    })
    comments: Comment[]
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

export class User {
    @ApiProperty({
        required: true
    })
    email: string;
    @ApiProperty({
        required: true
    })
    token: string;
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
}

export class SingleUser {
    @ApiProperty({
        required: true,
        type: User
    })
    user: User
}

export class Tags {
    @ApiProperty({
        required: true
    })
    tags: string[]
}