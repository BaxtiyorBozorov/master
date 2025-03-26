import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SignupDto, VerifyOtpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data.email, data.otp);
  }

  @Post('register')
  async create(@Body(new ValidationPipe()) dto: RegisterDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) dto: LoginDto) {
    return this.authService.login(dto);
  }
}
