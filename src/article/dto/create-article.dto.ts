import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

import {
    IsArray,
    IsObject,
    IsString,
    IsNotEmpty,
    IsOptional,
    ValidateNested
} from "class-validator";


export class CreateArticleDtoEle {
    @ApiProperty({
        required: true,
        description: 'title of article'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        required: true,
        description: 'description of an article'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        required: true,
        description: 'body of an article'
    })
    @IsString()
    @IsNotEmpty()
    body: string;

    @ApiProperty({
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tagList: string[];
}
export class CreateArticleDto {

    @ApiProperty({
        required: true,
        description: 'New Article',
    })
    @IsObject()
    @ValidateNested()
    @Type(() => CreateArticleDtoEle)
    article: CreateArticleDtoEle
}