import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";

class AddCommentDtoEle {
    @ApiProperty({
        example: 'Excellent work keep it up bro!',
        required: true,
        name: 'body'
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
