import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProfilDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Baxrom', description: 'firstname', type: 'string' })
  firstname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Baxrom', description: 'lastname', type: 'string' })
  lastname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '998991234567',
    description: 'phone',
    type: 'string',
  })
  phone?: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  @ApiProperty({
    example: 'Baxrom123!',
    description: 'old_password',
    type: 'string',
  })
  old_password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  @ApiProperty({
    example: 'Baxrom123!',
    description: 'new_password',
    type: 'string',
  })
  new_password: string;
}
