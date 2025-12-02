import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MinLength
} from 'class-validator';

export class ForgetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @Length(5)
  otp: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword:string;
}
