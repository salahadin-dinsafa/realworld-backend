import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";

class AddCommentDtoEle {
    @IsNotEmpty()
    @IsString()
    body: string;
}

export class AddCommentDto {
    @IsObject()
    @ValidateNested()
    comment: AddCommentDtoEle
}
