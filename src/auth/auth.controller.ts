import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";

@Controller('users')
export class AuthController {

    @Post('login')
    login(){}

    @Post()
    register(){}
}