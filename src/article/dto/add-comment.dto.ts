import {
    IsObject,
    IsString,
    IsNotEmpty,
    ValidateNested
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

class AddCommentDtoEle {
    @ApiProperty({
        name: 'body',
        required: true,
        example: 'Excellent work keep it up bro!',
    })
    @IsNotEmpty()
    @IsString()
    body: string;
}

export class AddCommentDto {
    @IsObject()
    @ValidateNested()
    comment: AddCommentDtoEle
}
