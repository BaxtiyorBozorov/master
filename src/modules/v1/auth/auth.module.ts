import { Module } from "@nestjs/common";

import { MailModule } from "../mail/mail.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CacheService } from "./service/cache.service";
import { TokenService } from "./service/jwt.service";

@Module({
  imports: [MailModule],
  providers: [AuthService, CacheService , TokenService],
  exports: [AuthService, CacheService , TokenService],
  controllers: [AuthController]
})


export class AuthModule {}