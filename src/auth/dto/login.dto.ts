import { Type } from "class-transformer";
import {
    IsEmail,
    IsObject,
    IsString,
    IsNotEmpty,
    ValidateNested
} from "class-validator";

export class LoginEle {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}


export class LoginDto {
    @IsObject()
    @ValidateNested()
    @Type(() => LoginEle)
    user: LoginEle
}

