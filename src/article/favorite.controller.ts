import { Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";

import { ArticleService } from "./article.service";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/user/entities/user.entity";
import { User } from "src/user/decorators/user.decorator";
import { IArticle } from "./interface/article.interface";

@Controller('articles/:slug/favorite')
export class FavoriteController {
    constructor(private readonly articleService: ArticleService){}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    favoriteArticle(
        @User() user: UserEntity,
        @Param('slug')   slug: string,
    ): Promise<IArticle>{
        return this.articleService.favorite(user,slug);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    unFavorite(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IArticle>{
        return this.articleService.unFavorite(user, slug);
    }


}