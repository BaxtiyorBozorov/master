import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'baxrom@gmail.com', description: 'Email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Password' })
  password: string;
}