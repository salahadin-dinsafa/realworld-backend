import {
    HttpCode,
    HttpStatus,
    Body,
    Post,
    Controller
} from "@nestjs/common";

import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";


import { LoginDto } from "src/auth/dto/login.dto";
import { AuthService } from "src/auth/auth.service";
import { IUser } from "src/user/interface/user.interface";
import { RegistrationDto } from "src/auth/dto/registration.dto";
import { SingleUser, GenericErrorModel } from "src/common/dto/swagger.dt";

@ApiTags('Authentication')
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOkResponse({
        description: 'User',
        type: SingleUser,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Existing user login',
        description: 'Login for existing user'
    })
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<IUser> {
        return this.authService.login(loginDto);
    }

    @ApiOkResponse({
        description: 'User',
        type: SingleUser,
    })
    @ApiUnprocessableEntityResponse({
        description: 'Unexpected error',
        type: GenericErrorModel
    })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'New user registration',
        description: 'Register a new user'
    })
    @Post()
    register(@Body() registrationDto: RegistrationDto): Promise<IUser> {
        return this.authService.register(registrationDto);
    }
}