import { OmitType, PartialType } from "@nestjs/swagger";
import { IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { CreateArticleDtoEle } from "./create-article.dto";

class UpdateArticle extends OmitType(CreateArticleDtoEle, ['tagList']) { }

export class UpdateArticleDtoEle extends PartialType(UpdateArticle) { }

export class UpdateArticleDto {
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateArticleDtoEle)
    article: UpdateArticleDtoEle
}