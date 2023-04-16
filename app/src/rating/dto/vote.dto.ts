import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class VoteDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;
}
