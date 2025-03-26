import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: false, description: 'So‘rov muvaffaqiyatli bajarildimi' })
  success: boolean;

  @ApiProperty({ example: 400, description: 'HTTP status kodi' })
  statusCode: number;

  @ApiProperty({ example: '/v1/auth/signup', description: 'Endpoint yo‘li' })
  path: string;

  @ApiProperty({ example: '2025-03-25T10:14:33.662Z', description: 'Xatolik vaqti' })
  timestamp: string;

  @ApiProperty({ example: 'User already exists', description: 'Xatolik xabari' })
  message: string;
}
