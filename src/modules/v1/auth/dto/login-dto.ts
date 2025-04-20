import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'superAdmin@gmail.com', description: 'email' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(32)
    @ApiProperty({ example: 'super admin', description: 'password' })
    password: string;
}
