import {
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    UseGuards,
    HttpStatus,
    Controller,
    ParseIntPipe,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiBearerAuth,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";


import {
    Comments,
    GenericErrorModel,
    SingleComment
} from "src/common/dto/swagger.dt";
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { ArticleService } from "src/article/article.service";
import { AddCommentDto } from "src/article/dto/add-comment.dto";
import { IComment } from "src/article/interface/comment.interface";
import { IComments } from "src/article/interface/comments.interface";

@ApiTags('Comments')
@Controller('articles/:slug/comments')
export class CommentController {
    constructor(private readonly articleService: ArticleService) { }


    @ApiOkResponse({
        description: 'Multiple comments',
        type: Comments
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
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

    @ApiOkResponse({
        description: 'Single comments',
        type: SingleComment
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Create a comment for an article',
        description: 'Create a comment for an article. Auth is required'
    })
    @ApiParam({
        required: true,
        name: "slug",
        description: 'Slug of the article that you want to create a comment for'
    })
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    addCommentToArticle(
        @User() user: UserEntity,
        @Param('slug') slug: string,
        @Body() addCommentDto: AddCommentDto
    ): Promise<IComment> {
        return this.articleService.addComment(user, slug, addCommentDto)
    }

    @ApiOkResponse({
        description: 'No content'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
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
    @ApiBearerAuth()
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