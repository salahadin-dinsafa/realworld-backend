import {
    Post,
    Param,
    Delete,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus,
} from "@nestjs/common";


import {
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ApiParam } from "@nestjs/swagger/dist/decorators/api-param.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiBearerAuth } from "@nestjs/swagger/dist/decorators/api-bearer.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { ArticleService } from "src/article/article.service";
import { IArticle } from "src/article/interface/article.interface";
import { SingleArticle, GenericErrorModel } from "src/common/dto/swagger.dt";

@ApiTags('Favorites')
@Controller('articles/:slug/favorite')
export class FavoriteController {
    constructor(private readonly articleService: ArticleService) { }

    @ApiOkResponse({
        description: 'Single article',
        type: SingleArticle,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Favorite an article',
        description: 'Favorite an article. Auth is required'
    })
    @HttpCode(HttpStatus.OK)
    @ApiParam({
        name: 'slug',
        description: 'Slug of the article that you want to favorite'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    favoriteArticle(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle> {
        return this.articleService.favorite(user, slug);
    }

    @ApiOkResponse({
        description: 'Single article',
        type: SingleArticle,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Unfavorite an article',
        description: 'Unfavorite an article. Auth is required'
    })
    @ApiParam({
        name: 'slug',
        description: 'Slug of the article that you want to unfavorite'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    unFavorite(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle> {
        return this.articleService.unFavorite(user, slug);
    }


}