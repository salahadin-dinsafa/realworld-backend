import { Controller, Get } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { ArticleService } from "../article.service";
import { ITag } from "../interface/tag.interface";
import { ApiOkResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { Tags, GenericErrorModel } from "src/common/dto/swagger.dt";

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
    constructor(private readonly articleService: ArticleService) { }

     @ApiOkResponse({
        description: 'Tags',
        type: Tags,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Get tags',
        description: 'Get tags. Auth not required'
    })
    @Get()
    findAll(): Promise<ITag> {
        return this.articleService.findTags();
    }
}