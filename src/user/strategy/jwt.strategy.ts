import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: { email: string }): Promise<UserEntity> {
        const user: UserEntity = await this.userService.findByEmail(payload.email);
        if (!user)
            throw new UnauthorizedException('unauthorized user');
        return user;
    }
}