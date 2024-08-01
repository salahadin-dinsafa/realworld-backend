import {
    Body,
    Get,
    Put,
    UseGuards,
    Controller
} from "@nestjs/common";

import {
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiBearerAuth } from "@nestjs/swagger/dist/decorators/api-bearer.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { UserService } from "src/user/user.service";
import { UpdateDto } from "src/user/dto/update.dto";
import { User } from "src/user/decorators/user.decorator";
import { IUser } from "src/user/interface/user.interface";
import { UserEntity } from "src/user/entities/user.entity";
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