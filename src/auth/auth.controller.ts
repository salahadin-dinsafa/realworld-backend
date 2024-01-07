import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";

import { RegistrationDto } from "./dto/registration.dto";
import { IUser } from "src/user/interface/user.interface";
import { AuthService } from "./auth.service";

@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login() { }

    @Post()
    register(@Body() registrationDto: RegistrationDto): Promise<IUser> {
        return this.authService.register(registrationDto);
    }
}