import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";

import * as argon from 'argon2';

import { IRegistration } from "./interface/registration.interface";
import { IUser } from "src/user/interface/user.interface";
import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entities/user.entity";
import { ILogin } from "./interface/login.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,

    ) { }

    async register(registration: IRegistration): Promise<IUser> {
        const user: UserEntity = await this.userService.create(registration);
        return await this.userService.getUser(user);
    }

    async login(login: ILogin): Promise<IUser> {
        let user: UserEntity = await this.userService.findByEmail(login.user.email);

        if (!user)
            throw new UnauthorizedException('user not authorize');

        const isValidPass: boolean = await argon.verify(user.password, login.user.password);

        if (!isValidPass)
            throw new UnauthorizedException('user not authorize');

        try {
            return await this.userService.getUser(user);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }


}