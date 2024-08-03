import { Module } from "@nestjs/common/decorators/modules/module.decorator";

import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";


import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { UserEntity } from "src/user/entities/user.entity";
import { JwtStrategy } from 'src/user/strategy/jwt.strategy';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '7d'
            }
        }),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService, JwtModule, PassportModule]
})

export class UserModule { }