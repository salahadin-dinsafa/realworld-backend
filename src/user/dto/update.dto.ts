import {
    IsEmail,
    IsObject,
    IsString,
    IsOptional,
    IsNotEmpty,
    ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class UpdateDtoEle {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;


    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({
        required: false
    })
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