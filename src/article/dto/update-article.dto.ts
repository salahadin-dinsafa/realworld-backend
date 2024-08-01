import { Type } from "class-transformer";
import { OmitType, PartialType } from "@nestjs/swagger";
import { IsObject, ValidateNested } from "class-validator";

import { CreateArticleDtoEle } from "src/article/dto/create-article.dto";

class UpdateArticle extends OmitType(CreateArticleDtoEle, ['tagList']) { }

export class UpdateArticleDtoEle extends PartialType(UpdateArticle) { }

export class UpdateArticleDto {
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateArticleDtoEle)
    article: UpdateArticleDtoEle
}