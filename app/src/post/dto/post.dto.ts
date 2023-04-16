import { IsInt, IsNotEmpty } from "class-validator";

export class PostDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}
