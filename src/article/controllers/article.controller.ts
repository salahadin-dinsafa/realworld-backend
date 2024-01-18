import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { ArticleService } from "../article.service";
import { UserEntity } from "src/user/entities/user.entity";
import { User } from "src/user/decorators/user.decorator";
import { CreateArticleDto } from "../dto/create-article.dto";
import { IArticle } from "../interface/article.interface";
import { UpdateArticleDto } from "../dto/update-article.dto";
import { FeedPaginationDto } from "../dto/feed-pagination.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { IArticles } from "../interface/articles.interface";
import { ApiParam } from "@nestjs/swagger/dist/decorators/api-param.decorator";


@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @ApiOperation({
        summary: 'Get recent articles from users you follow',
        description: 'Get most recent articles from users you follow. Use query parameters to limit. Auth is required'
    })
    @UseGuards(AuthGuard('jwt'))
    @Get('feed')
    feed(
        @User() user: UserEntity,
        @Query() feedPaginationDto: FeedPaginationDto,
    ): Promise<IArticles> {
        return this.articleService.feed(user, feedPaginationDto);
    }

    @ApiOperation({
        summary: 'Get recent articles globally',
        description: 'Get most recent articles globally. Use query parameters to filter results. Auth is optional'
    })
    @Get()
    find(
        @User() user: UserEntity,
        @Query() paginationDto: PaginationDto,
    ): Promise<IArticles> {
        return this.articleService.find(user, paginationDto);
    }

    @ApiOperation({
        summary: 'Create an article',
        description: 'Create an article. Auth is required'
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(
        @User() user: UserEntity,
        @Body() createArticleDto: CreateArticleDto
    ): Promise<IArticle> {
        return this.articleService.create(user, createArticleDto);
    }

    @ApiOperation({
        summary: 'Get an article',
        description: 'Get an article. Auth not required'
    })
    @ApiParam({
        description: 'Slug of the article to get',
        name: 'slug',
        required: true
    })
    @Get(':slug')
    findOne(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle> {
        return this.articleService.findOne(user, slug);

    }

    @ApiOperation({
        summary: 'Update an article',
        description: 'Update an article. Auth is required'
    })
    @ApiParam({
        description: 'Slug of the article to update',
        name: 'slug',
        required: true
    })
    @UseGuards(AuthGuard('jwt'))
    @Put(":slug")
    update(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<IArticle> {
        return this.articleService.update(user, slug, updateArticleDto);
    }

    @ApiOperation({
        summary: 'Delete an article',
        description: 'Delete an article. Auth is required'
    })
    @ApiParam({
        description: 'Slug of the article to delete',
        name: 'slug',
        required: true
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':slug')
    delete(
        @User() user: UserEntity,
        @Param('slug') slug: string
    ): Promise<void> {
        return this.articleService.delete(user, slug);
    }





}