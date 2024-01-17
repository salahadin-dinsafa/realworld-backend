import { Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { ProfileService } from './profile.service';
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { IProfile } from "./interfaces/profile.interface";

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @ApiOperation({
        summary: 'Get a profile',
        description: 'Get a profile of a user of the system. Auth is optional'
    })
    @Get(':username')
    find(
        @Param('username') username: string,
        @User() user: UserEntity,
    ): Promise<IProfile> {
        return this.profileService.find(username, user);
    }

    @ApiOperation({
        summary: 'Follow  a user',
        description: 'Follow a user by username'
    })
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    @Post(':username/follow')
    follow(
        @User() user: UserEntity,
        @Param('username') username: string,
    ): Promise<IProfile> {
        return this.profileService.follow(username, user);
    }

    @ApiOperation({
        summary: 'Unfollow  a user',
        description: 'unFollow a user by username'
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':username/follow')
    unFollow(
        @User() user: UserEntity,
        @Param('username') username: string,
    ): Promise<IProfile> {
        return this.profileService.unFollow(username, user);
    }
}