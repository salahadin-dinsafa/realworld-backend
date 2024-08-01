import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common";

import * as argon from 'argon2';

import { UserService } from "src/user/user.service";
import { IUser } from "src/user/interface/user.interface";
import { UserEntity } from "src/user/entities/user.entity";
import { ILogin } from "src/auth/interface/login.interface";
import { IRegistration } from "src/auth/interface/registration.interface";

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
            throw new UnauthorizedException({ '': ['email or password invalid'] });

        const isValidPass: boolean = await argon.verify(user.password, login.user.password);

        if (!isValidPass)
            throw new UnauthorizedException({ '': ['email or password invalid'] });

        try {
            return await this.userService.getUser(user);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }


}