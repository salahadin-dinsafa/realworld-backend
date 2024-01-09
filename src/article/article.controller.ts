import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

import { ArticleService } from "./article.service";
import { UserEntity } from "src/user/entities/user.entity";
import { User } from "src/user/decorators/user.decorator";
import { CreateArticleDto } from "./dto/create-article.dto";
import { IArticle } from "./interface/article.interface";
import { UpdateArticleDto } from "./dto/update-article.dto";

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

    @UseGuards(AuthGuard('jwt'))
    @Put(":slug")
    update(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<IArticle> {
        return this.articleService.update(user, slug, updateArticleDto);
    }

    
}