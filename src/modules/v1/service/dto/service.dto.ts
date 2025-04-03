import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'category_id' })
    category_id: number;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Service title', description: 'title' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Service description', description: 'description' })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 100000, description: 'price' })
    price: number;
    picture?: string;
}
