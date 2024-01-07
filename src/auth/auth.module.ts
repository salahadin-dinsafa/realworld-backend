import { Module } from "@nestjs/common/decorators/modules/module.decorator";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule { }