import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { ValidationError } from "class-validator";



export const validationExceptionFactory = (errors: ValidationError[]) => {
    const errMsg: Record<string, unknown> = {};

    errors.forEach((error: ValidationError) => {
        if (error.children && error.children.length > 0) {
            errMsg[error.property] = {}
            error.children.forEach((e: ValidationError) => {
                errMsg[error.property][e.property] = [...Object.values(e.constraints)];
            })
        } else {
            errMsg[error.property] = [...Object.values(error.constraints)];
        }
    });

    return new ValidationException(errMsg);
};

export class ValidationException extends BadRequestException {
    constructor(public validationErrors: Record<string, unknown>) {
        super(validationErrors);
    }
}