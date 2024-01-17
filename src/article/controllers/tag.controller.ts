import { Controller, Get } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { ArticleService } from "../article.service";
import { ITag } from "../interface/tag.interface";

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
    constructor(private readonly articleService: ArticleService) { }

    @ApiOperation({
        summary: 'Get tags',
        description: 'Get tags. Auth not required'
    })
    @Get()
    findAll(): Promise<ITag> {
        return this.articleService.findTags();
    }
}