import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      },
    }),
  ],
  providers: [MailService], // ✅ `providers` ichida bo‘lishi kerak
  exports: [MailService], // ✅ `exports` qilish kerak, shunda `AuthModule` foydalanishi mumkin
})
export class MailModule {}
