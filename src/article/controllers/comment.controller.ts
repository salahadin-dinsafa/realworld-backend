import { Controller, UseGuards, Post, Param, Body, Get, Delete, ParseIntPipe } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { ArticleService } from "../article.service";
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { AddCommentDto } from "../dto/add-comment.dto";
import { IComment } from "../interface/comment.interface";
import { IComments } from "../interface/comments.interface";

@ApiTags('Comment')
@Controller('articles/:slug/comments')
export class CommentController {
    constructor(private readonly articleService: ArticleService) { }


    @ApiOperation({
        summary: 'Get comments from an article',
        description: 'Get the comments for an article. Auth is optional'
    })
    @Get()
    findComments(
        @User() user: UserEntity,
        @Param('slug') slug: string,
    ): Promise<IComments> {
        return this.articleService.findComments(user, slug);
    }

    @ApiOperation({
        summary: 'Create a comment for an article',
        description: 'Create a comment for an article. Auth is required'
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    addCommentToArticle(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Body() addCommentDto: AddCommentDto
    ): Promise<IComment> {
        return this.articleService.addComment(user, slug, addCommentDto)
    }

    @ApiOperation({
        summary: 'Delete a comment for an article',
        description: 'Delete a comment for an article. Auth is required'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    removeComment(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        return this.articleService.removeComment(user, slug, id);
    }
}