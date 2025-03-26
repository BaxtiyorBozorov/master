import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class SignupDto {
  

  @ApiProperty({example:'baxrom@gmail.com' , description:'Email'})
  @IsString()
  @IsNotEmpty()
  email: string;

  
}

export class VerifyOtpDto {
  @ApiProperty({example:'baxrom@gmail.com' , description:'Email'})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({example:'123456' , description:'OTP'})
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class RegisterDto {
  @ApiProperty({example:'Baxrom' , description:'First name'})
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({example:'Baxrom' , description:'Last name'})
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({example:'baxrom@gmail.com' , description:'Email'})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({example:'123456' , description:'Password'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({example:'998977777777' , description:'Phone'})
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({example:'user' , description:'Role'})
  @IsEnum(['user', 'master'])
  role: string;
}