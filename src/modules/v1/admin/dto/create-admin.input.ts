import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAdminDto {
   @ApiProperty({ example: 'samandar', description: 'First name' })
      @IsString()
      @IsNotEmpty()
      firstname: string;
  
      @ApiProperty({ example: 'samandar', description: 'Last name' })
      @IsString()
      @IsNotEmpty()
      lastname: string;
  
      @ApiProperty({ example: 'samandar@gmail.com', description: 'Email' })
      @IsString()
      @IsNotEmpty()
      email: string;
  
      @ApiProperty({ example: 'samandar123!', description: 'Password' })
      @IsString()
      @IsNotEmpty()
      @MinLength(6)
      @MaxLength(32)
      password: string;
  
      @ApiProperty({ example: '998977777777', description: 'Phone' })
      @IsString()
      @IsNotEmpty()
      phone: string;
  
  role: string
}
