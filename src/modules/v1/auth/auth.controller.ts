import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse } from 'src/common/swagger/common-errors';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto, SignupDto, VerifyOtpDto } from './dto/signup-dto';

@Controller('v1/auth')
  // @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data.email, data.otp);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body(new ValidationPipe()) dto: RegisterDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ValidationPipe()) dto: LoginDto) {
    return this.authService.login(dto);
  }

 
}
