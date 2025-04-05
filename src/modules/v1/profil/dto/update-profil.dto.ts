import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class UpdateProfilDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Baxrom',
        description: 'firstname',
        type: 'string',
    })
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&]{6,32}$/,
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&]{6,32}$/,
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
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [1, 2], description: 'category_id', type: 'array' })
    category_id: [number];

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
    @ApiProperty({
        example: 'Uzbekistan Tashkent Amir Temur 1',
        description: 'address',
        type: 'string',
    })
    address: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 41.311, description: 'latitude', type: 'number' })
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 69.24, description: 'longitude', type: 'number' })
    longitude: number;
}
