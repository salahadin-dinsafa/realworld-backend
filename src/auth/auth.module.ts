import { Module } from "@nestjs/common/decorators/modules/module.decorator";

import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";


import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/user/entities/user.entity";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    
})

export class AuthModule { }