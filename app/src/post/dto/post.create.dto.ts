import { IsNotEmpty } from "class-validator";

export class PostCreateDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}