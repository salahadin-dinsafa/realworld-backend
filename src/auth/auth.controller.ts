import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";

import { RegistrationDto } from "./dto/registration.dto";
import { IUser } from "src/user/interface/user.interface";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<IUser> {
        return this.authService.login(loginDto);
    }

    @Post()
    register(@Body() registrationDto: RegistrationDto): Promise<IUser> {
        return this.authService.register(registrationDto);
    }
}