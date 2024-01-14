import { BadRequestException, HttpException } from "@nestjs/common/exceptions";
import { ExceptionFilter, ArgumentsHost } from "@nestjs/common/interfaces";
import { Catch } from "@nestjs/common/decorators/core/catch.decorator";
import { HttpStatus } from "@nestjs/common/enums";
import { Response } from "express";

import {
    HttpExceptionResponse,
    RealWorldHttpExceptionResponse
} from "../interface/http-exception-response.interface";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status: HttpStatus;
        let errorMessage: string | object;

        if (exception instanceof HttpException) {
            if (exception instanceof BadRequestException) {
                status = 422;
                errorMessage = exception.getResponse();
            } else {
                status = exception.getStatus();
                const errorResponse = exception.getResponse();
                errorMessage = exception.message || (errorResponse as HttpExceptionResponse).error;
            }

        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = 'Critical internal server error occured!';
        }

        const errorResponse = this._getErrorResponse(errorMessage);

        response.status(status).json(errorResponse);
    }

    _getErrorResponse =
        (errorMessage: string | object):
            RealWorldHttpExceptionResponse => ({
                errors: errorMessage
            })




}