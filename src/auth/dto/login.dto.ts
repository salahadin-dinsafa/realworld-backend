import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";

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

