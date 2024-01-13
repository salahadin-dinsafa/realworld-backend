import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    tag: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    favorited: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    limit: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    offset: number;
}