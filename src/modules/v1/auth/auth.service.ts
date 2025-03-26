import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import { comparePassword, generateHashedPassword } from 'src/common/utils/bycrypt.functions';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto, SignupDto } from './dto/signup-dto';
import { UserInterface } from './entity/user-interface';
import { CacheService } from './service/cache.service';
import { TokenService } from './service/jwt.service';

@Injectable()
export class AuthService extends BaseService<UserInterface> {
  constructor(
    private readonly mailService: MailService,
    private readonly cacheService: CacheService,
    private readonly tokeService: TokenService
  ) {
    super('users');
  }

  async signup(dto: SignupDto): Promise<void> {
    const user = await this.findByQueryOne({ email: dto.email });
    if (user) throw new BadRequestException('User already exists');

    // Tasodifiy 6 xonali OTP yaratish
    const otp = Math.floor(100000 + Math.random() * 900000).toString();


    // OTP ni Redisda saqlash (5 daqiqa davomida)
    await this.cacheService.setOtp(dto.email, otp);

    const info = await this.cacheService.getOtp(dto.email)

    console.log(info);
    
    
    // OTP ni emailga jo‘natish
    await this.mailService.sendOtp(dto.email, otp);
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this.cacheService.getOtp(email);
    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Noto‘g‘ri yoki muddati o‘tgan kod');
    }

    // OTP to‘g‘ri bo‘lsa, uni Redisdan o‘chirish
    await this.cacheService.deleteOtp(email);

    return true;
  }

  async createUser(dto: RegisterDto): Promise<UserInterface> {
    dto.password = await generateHashedPassword(dto.password)
    console.log(dto.password);
    
    return this.create(dto);
  }

  async login(dto: LoginDto): Promise<object> {
    const user = await this.findByQueryOne({ email: dto.email });

    if (!user) throw new BadRequestException('User not found');
    const isPasswordValid = comparePassword(dto.password, user.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid password');
    const token = await this.tokeService.generateEncryptedToken({ id: user.id, role: user.role, email: user.email });
    return { token };
  }

}
