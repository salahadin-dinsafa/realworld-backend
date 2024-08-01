import { Module } from "@nestjs/common/decorators/modules/module.decorator";


import { UserModule } from "src/user/user.module";
import { AuthService } from "src/auth/auth.service";
import { AuthController } from "src/auth/auth.controller";

@Module({
    imports: [
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],

})

export class AuthModule { }