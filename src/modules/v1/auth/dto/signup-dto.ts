import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'baxrom@gmail.com', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'baxrom@gmail.com', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: 'OTP' })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Baxrom', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Baxrom', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'baxrom@gmail.com', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Baxrom123!', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&]{6,32}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @ApiProperty({ example: '998977777777', description: 'Phone' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'user', description: 'Role' })
  @IsEnum(['user', 'master'])
  role: string;
}
