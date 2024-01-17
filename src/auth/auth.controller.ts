import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";

import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";

import { RegistrationDto } from "./dto/registration.dto";
import { IUser } from "src/user/interface/user.interface";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags('Authentication')
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({
        summary: 'Existing user login',
        description: 'Login for existing user'
    })
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<IUser> {
        return this.authService.login(loginDto);
    }

    @ApiOperation({
        summary: 'New user registration',
        description: 'Register a new user'
    })
    @Post()
    register(@Body() registrationDto: RegistrationDto): Promise<IUser> {
        return this.authService.register(registrationDto);
    }
}