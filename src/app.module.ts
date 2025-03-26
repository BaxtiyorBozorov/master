import { Module } from '@nestjs/common';
import { AuthModule } from './modules/v1/auth/auth.module';
import { CategoryModule } from './modules/v1/categories/category.module';

@Module({
  imports: [AuthModule, CategoryModule],
})
export class AppModule {}
