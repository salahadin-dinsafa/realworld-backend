import { Module } from "@nestjs/common/decorators/modules/module.decorator";


import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    
})

export class AuthModule { }