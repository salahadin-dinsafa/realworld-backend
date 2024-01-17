import { Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { ArticleService } from "../article.service";
import { UserEntity } from "src/user/entities/user.entity";
import { User } from "src/user/decorators/user.decorator";
import { IArticle } from "../interface/article.interface";

@ApiTags('Favorite')
@Controller('articles/:slug/favorite')
export class FavoriteController {
    constructor(private readonly articleService: ArticleService) { }

    @ApiOperation({
        summary: 'Favorite an article',
        description: 'Favorite an article. Auth is required'
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    favoriteArticle(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle> {
        return this.articleService.favorite(user, slug);
    }

    @ApiOperation({
        summary: 'Unfavorite an article',
        description: 'Unfavorite an article. Auth is required'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    unFavorite(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle> {
        return this.articleService.unFavorite(user, slug);
    }


}