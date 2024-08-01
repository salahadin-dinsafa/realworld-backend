import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileModule } from "src/profile/profile.module";
import { ArticleService } from "src/article/article.service";
import { ArticleEntity } from "src/article/entities/article.entity";
import { CommentEntity } from "src/article/entities/comment.entity";
import { TagsController } from "src/article/controllers/tag.controller";
import { ArticleController } from "src/article/controllers/article.controller";
import { CommentController } from "src/article/controllers/comment.controller";
import { FavoriteController } from "src/article/controllers/favorite.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity, CommentEntity]),
        ProfileModule,
    ],
    controllers: [
        ArticleController,
        CommentController,
        FavoriteController,
        TagsController,
    ],
    providers: [ArticleService],
})
export class ArticleModule { }