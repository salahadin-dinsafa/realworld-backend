import { Request } from 'express';

import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";


export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { user } = request;
    if (!user) return null;
    if (data) return user[data];
    return user;

})