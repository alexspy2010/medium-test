import { IsEmail, IsNotEmpty } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    password: string;
}