import { Type } from "class-transformer";

import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateArticleDtoEle {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString({ each: true })
    @IsOptional()
    tagList: string[];
}
export class CreateArticleDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CreateArticleDtoEle)
    article: CreateArticleDtoEle
}