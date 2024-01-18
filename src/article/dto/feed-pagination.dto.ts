import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNumber, IsOptional, Min } from "class-validator";

export class FeedPaginationDto {
    @ApiProperty({
        description: 'The number of items to skip before starting to collect the result set.',
        required: false,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    offset: number;

    @ApiProperty({
        description: 'The numbers of items to return.',
        required: false,
        default: 20,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    limit: number;

}