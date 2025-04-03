import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse } from 'src/common/swagger/common-errors';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto, SignupDto, VerifyOtpDto } from './dto/signup-dto';
import { UserInterface } from './entity/user-interface';

@Controller('auth')
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
    const token = await this.authService.login(dto)
    const userData = await this.authService.getMe(dto.email)
    return { status : "success", message: "Login successful", ...token, userData };
  }

  

 
}
