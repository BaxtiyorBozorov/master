import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse } from 'src/common/swagger/common-errors';

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
    async signup(@Body() dto: SignupDto): Promise<{ message: string }> {
        await this.authService.signup(dto);
        return {
            message: 'OTP sent to your email',
        };
    }

    @Post('verify-otp')
    @HttpCode(HttpStatus.OK)
    async verifyOtp(
        @Body() data: VerifyOtpDto,
    ): Promise<{ message: string; result: boolean }> {
        const result = await this.authService.verifyOtp(data.email, data.otp);
        return {
            message: 'OTP verified successfully',
            result: result,
        };
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async createUser(
        @Body(new ValidationPipe()) dto: RegisterDto,
    ): Promise<Partial<UserInterface>> {
        return this.authService.createUser(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body(new ValidationPipe()) dto: LoginDto,
    ): Promise<{
        message: string;
        token: string;
        userData: Partial<UserInterface>;
    }> {
        const token = await this.authService.login(dto);
        const userData = await this.authService.getMe(dto.email);
        return {
            message: 'Login successful',
            token,
            userData,
        };
    }
}
