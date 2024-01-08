import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

import { AuthGuard } from "@nestjs/passport/dist/auth.guard";

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    handleRequest<Tuser = any>(_err: any, user: any, _info: any, _context: any, _status?: any): Tuser {
        return user;
    }
}