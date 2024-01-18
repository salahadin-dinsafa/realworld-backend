import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class RegistrationEle {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsString()
    bio: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    image: string;
}

export class RegistrationDto {
    @IsObject()
    @ValidateNested()
    @Type(() => RegistrationEle)
    user: RegistrationEle;
}