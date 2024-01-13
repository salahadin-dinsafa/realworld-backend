import { Controller, Get } from "@nestjs/common";

import { ArticleService } from "../article.service";
import { ITag } from "../interface/tag.interface";

@Controller('tags')
export class TagsController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    findAll(): Promise<ITag> {
        return this.articleService.findTags();
    }
}