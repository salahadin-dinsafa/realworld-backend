import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";


export class UpdateDtoEle {
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    bio: string;
}
export class UpdateDto {
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateDtoEle)
    user: UpdateDtoEle;
}