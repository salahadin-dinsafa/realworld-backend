import { Module } from "@nestjs/common/decorators/modules/module.decorator";

import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";


import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from "./entities/user.entity";
import { JwtStrategy } from '../user/strategy/jwt.strategy';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 3600
            }
        }),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService, JwtModule, PassportModule]
})

export class UserModule { }