import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

import { ArticleService } from "./article.service";
import { UserEntity } from "src/user/entities/user.entity";
import { User } from "src/user/decorators/user.decorator";
import { CreateArticleDto } from "./dto/create-user.dto";
import { IArticle } from "./interface/article.interface";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(
        @User() user: UserEntity,
        @Body() createArticleDto: CreateArticleDto
    ): Promise<IArticle> {
        return this.articleService.create(user, createArticleDto);
    }
}