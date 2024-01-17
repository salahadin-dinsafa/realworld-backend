import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleController } from "./controllers/article.controller";
import { ArticleService } from "./article.service";
import { ArticleEntity } from "./entities/article.entity";
import { ProfileModule } from "src/profile/profile.module";
import { CommentEntity } from "./entities/comment.entity";
import { FavoriteController } from "./controllers/favorite.controller";
import { TagsController } from "./controllers/tag.controller";
import { CommentController } from "./controllers/comment.controller";

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