import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

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

export class UpdateMasterDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'category_id', type: 'number' })
  category_id: number;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 4, description: 'experience', type: 'number' })
  experience: number;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 100000, description: 'min_price', type: 'number' })
  min_price: number;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1000000, description: 'max_price', type: 'number' })
  max_price: number;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Uzbekistan Tashkent Amir Temur 1', description: 'address', type: 'string' })
  address: string;
}