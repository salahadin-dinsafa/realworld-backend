import { Response } from "express";

import { HttpStatus } from "@nestjs/common/enums";
import { Catch } from "@nestjs/common/decorators/core/catch.decorator";
import { ExceptionFilter, ArgumentsHost } from "@nestjs/common/interfaces";
import { BadRequestException, HttpException } from "@nestjs/common/exceptions";

import {
    HttpExceptionResponse,
    RealWorldHttpExceptionResponse
} from "src/common/interface/http-exception-response.interface";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status: HttpStatus;
        let errorMessage: object;

        if (exception instanceof HttpException) {
            if (exception instanceof BadRequestException) {
                status = 422;
                errorMessage = exception.getResponse() as object;
            } else {
                status = exception.getStatus();
                const errorResponse = exception.getResponse();
                errorMessage = (errorResponse as HttpExceptionResponse)
            }

        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = {
                '': ['Critical internal server error occurred!']
            };
        }

        const errorResponse = this._getErrorResponse(errorMessage);

        response.status(status).json(errorResponse);
    }

    _getErrorResponse =
        (errorMessage: object):
            RealWorldHttpExceptionResponse => ({
                errors: errorMessage
            })




}