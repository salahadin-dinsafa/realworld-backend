import {
    Get,
    Put,
    Post,
    Body,
    Query,
    Param,
    Delete,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import {
    Articles,
    GenericErrorModel,
    SingleArticle
} from "src/common/dto/swagger.dt";
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { ArticleService } from "src/article/article.service";
import { PaginationDto } from "src/article/dto/pagination.dto";
import { IArticle } from "src/article/interface/article.interface";
import { IArticles } from "src/article/interface/articles.interface";
import { UpdateArticleDto } from "src/article/dto/update-article.dto";
import { CreateArticleDto } from "src/article/dto/create-article.dto";


@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @ApiOkResponse({
        description: 'Multiple articles',
        type: Articles,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: GenericErrorModel
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Get recent articles from users you follow',
        description: 'Get most recent articles from users you follow. Use query parameters to limit. Auth is required'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('/feed')
    feed(
        @User() user: UserEntity,
        @Query() paginationDto: PaginationDto,
    ): Promise<IArticles> {
        return this.articleService.feed(user, paginationDto);
    }

    @ApiOkResponse({
        description: 'Multiple articles',
        type: Articles,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
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

    @ApiCreatedResponse({
        description: 'Single article',
        type: SingleArticle,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: GenericErrorModel
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Create an article',
        description: 'Create an article. Auth is required'
    })
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(
        @User() user: UserEntity,
        @Body() createArticleDto: CreateArticleDto
    ): Promise<IArticle> {
        return this.articleService.create(user, createArticleDto);
    }

    @ApiOkResponse({
        description: 'Single article',
        type: SingleArticle,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
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

    @ApiOkResponse({
        description: 'Single article',
        type: SingleArticle,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: GenericErrorModel
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Update an article',
        description: 'Update an article. Auth is required'
    })
    @ApiParam({
        description: 'Slug of the article to update',
        name: 'slug',
        required: true
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put(":slug")
    update(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<IArticle> {
        return this.articleService.update(user, slug, updateArticleDto);
    }

    @ApiOkResponse({
        description: 'No Content'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: GenericErrorModel
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Delete an article',
        description: 'Delete an article. Auth is required'
    })
    @ApiParam({
        description: 'Slug of the article to delete',
        name: 'slug',
        required: true
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':slug')
    delete(
        @User() user: UserEntity,
        @Param('slug') slug: string
    ): Promise<void> {
        return this.articleService.delete(user, slug);
    }





}