import { Controller, Get, Param, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

import { ProfileService } from './profile.service';
import { User } from "src/user/decorators/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { IProfile } from "./interfaces/profile.interface";

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get(':username')
    find(
        @Param('username') username: string,
        @User() user: UserEntity,
    ): Promise<IProfile> {
        return this.profileService.find(username, user);
    }

}