import { Controller, Get } from "@nestjs/common";


import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { ITag } from "src/article/interface/tag.interface";
import { ArticleService } from "src/article/article.service";
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