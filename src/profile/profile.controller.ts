import {
    Get,
    Post,
    Param,
    Delete,
    HttpCode,
    UseGuards,
    Controller,
} from "@nestjs/common";
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiOkResponse,
    ApiBearerAuth,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";



import { ProfileService } from 'src/profile/profile.service';
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { IProfile } from "src/profile/interfaces/profile.interface";
import { SingleProfile, GenericErrorModel } from "src/common/dto/swagger.dt";

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @ApiOkResponse({
        description: 'Profile',
        type: SingleProfile,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Get a profile',
        description: 'Get a profile of a user of the system. Auth is optional'
    })
    @ApiParam({
        name: 'username',
        required: true,
        description: 'Username of the profile to get'
    })
    @Get(':username')
    find(
        @Param('username') username: string,
        @User() user: UserEntity,
    ): Promise<IProfile> {
        return this.profileService.find(username, user);
    }

    @ApiOkResponse({
        description: 'Profile',
        type: SingleProfile,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Follow  a user',
        description: 'Follow a user by username'
    })
    @ApiParam({
        name: 'username',
        required: true,
        description: 'Username of the profile you want to follow'
    })
    @ApiBearerAuth()
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @Post(':username/follow')
    follow(
        @User() user: UserEntity,
        @Param('username') username: string,
    ): Promise<IProfile> {
        return this.profileService.follow(username, user);
    }

    @ApiOkResponse({
        description: 'Profile',
        type: SingleProfile,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @ApiOperation({
        summary: 'Unfollow  a user',
        description: 'unFollow a user by username'
    })
    @ApiParam({
        name: 'username',
        required: true,
        description: 'Username of the profile you want to unfollow'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':username/follow')
    unFollow(
        @User() user: UserEntity,
        @Param('username') username: string,
    ): Promise<IProfile> {
        return this.profileService.unFollow(username, user);
    }
}