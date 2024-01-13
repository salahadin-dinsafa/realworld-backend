import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

import { ArticleService } from "../article.service";
import { UserEntity } from "src/user/entities/user.entity";
import { User } from "src/user/decorators/user.decorator";
import { CreateArticleDto } from "../dto/create-article.dto";
import { IArticle } from "../interface/article.interface";
import { UpdateArticleDto } from "../dto/update-article.dto";
import { FeedPaginationDto } from "../dto/feed-pagination.dto";
import { AddCommentDto } from "../dto/add-comment.dto";
import { IComment } from "../interface/comment.interface";
import { IComments } from "../interface/comments.interface";

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

    @UseGuards(AuthGuard('jwt'))
    @Delete(':slug')
    delete(
        @User() user: UserEntity,
        @Param('slug') slug: string
    ): Promise<void> {
        return this.articleService.delete(user, slug);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('feed')
    feed(
        @User() user: UserEntity,
        @Query() feedPaginationDto: FeedPaginationDto,
    ): Promise<any> {
        return this.articleService.feed(user, feedPaginationDto);
    }

    @Get(':slug')
    findOne(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle> {
        return this.articleService.findOne(user, slug);

    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':slug/comments')
    addCommentToArticle(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Body() addCommentDto: AddCommentDto
    ): Promise<IComment> {
        return this.articleService.addComment(user, slug, addCommentDto)
    }

    @Get(':slug/comments')
    findComments(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IComments> {
        return this.articleService.findComments(user, slug);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(":slug/comments/:id")
    removeComment(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        return this.articleService.removeComment(user, slug, id);
    }


}