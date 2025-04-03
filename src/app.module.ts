import { Module } from '@nestjs/common';
import { AuthModule } from './modules/v1/auth/auth.module';
import { CategoryModule } from './modules/v1/categories/category.module';
import { ProfilModule } from './modules/v1/profil/profil.module';
import { ServiceModule } from './modules/v1/service/service.module';

@Module({
  imports: [AuthModule, CategoryModule , ProfilModule , ServiceModule] ,
})
export class AppModule {}
