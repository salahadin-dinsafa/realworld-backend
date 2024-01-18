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
import { ApiParam } from "@nestjs/swagger/dist/decorators/api-param.decorator";

@ApiTags('Comments')
@Controller('articles/:slug/comments')
export class CommentController {
    constructor(private readonly articleService: ArticleService) { }


    @ApiOperation({
        summary: 'Get comments from an article',
        description: 'Get the comments for an article. Auth is optional'
    })
    @ApiParam({
        required: true,
        name: "slug",
        description: 'Slug of the article that you want to get comments for'
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
    @ApiParam({
        required: true,
        name: "slug",
        description: 'Slug of the article that you want to create a comment for'
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
    @ApiParam({
        required: true,
        name: "slug",
        description: 'Slug of the article that you want to delete a comment for'
    })
    @ApiParam({
        required: true,
        name: "id",
        description: 'ID of the comment you want to delete'
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