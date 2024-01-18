import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        required: false,
        description: 'Filter by tag',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    tag: string;

    @ApiProperty({
        required: false,
        description: 'Filter by author (username)',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        required: false,
        description: 'Filter by favorites of a user (username)',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    favorited: string;

    @ApiProperty({
        required: false,
        description: 'The number of items to skip before starting to collect the result set.',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    offset: number;

    @ApiProperty({
        required: false,
        description: 'The numbers of items to return.',
        default: 20,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    limit: number;

}