import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Body, Get, Put, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";
import { ApiBearerAuth } from "@nestjs/swagger/dist/decorators/api-bearer.decorator";

import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { User } from "./decorators/user.decorator";
import { IUser } from "./interface/user.interface";
import { UpdateDto } from "./dto/update.dto";
import { ApiOkResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { SingleUser, GenericErrorModel } from "src/common/dto/swagger.dt";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOkResponse({
        description: 'User',
        type: SingleUser,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Get current user',
        description: 'Gets the currently logged-in user'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    find(@User() user: UserEntity): Promise<IUser> {
        return this.userService.getUser(user);
    }

    @ApiOkResponse({
        description: 'User',
        type: SingleUser,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Update current user',
        description: 'Updated user information for current user'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put()
    update(
        @User() user: UserEntity,
        @Body() updateDto: UpdateDto,
    ): Promise<IUser> {
        return this.userService.update(user, updateDto)
    }

}