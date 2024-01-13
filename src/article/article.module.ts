import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { ArticleEntity } from "./entities/article.entity";
import { ProfileModule } from "src/profile/profile.module";
import { CommentEntity } from "./entities/comment.entity";
import { FavoriteController } from "./favorite.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity, CommentEntity]),
        ProfileModule,
    ],
    controllers: [ArticleController, FavoriteController],
    providers: [ArticleService],
})
export class ArticleModule { }