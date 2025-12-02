import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    password:string
}