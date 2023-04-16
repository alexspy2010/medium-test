import { IsEmail, IsString } from "class-validator";

export class UsersDTO {
    @IsString()
    @IsEmail()
    mail: string;
    
    @IsString()
    password: string;
  }