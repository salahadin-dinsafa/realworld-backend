import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Body, Get, Put, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport/dist/auth.guard";

import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { User } from "./decorators/user.decorator";
import { IUser } from "./interface/user.interface";
import { UpdateDto } from "./dto/update.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    find(@User() user: UserEntity): Promise<IUser> {
        return this.userService.getUser(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    update(
        @User() user: UserEntity,
        @Body() updateDto: UpdateDto,
    ): Promise<IUser>{
        return this.userService.update(user, updateDto)
    }

}