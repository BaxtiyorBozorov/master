import { Module } from '@nestjs/common';

import { AuthModule } from './modules/v1/auth/auth.module';
import { CategoryModule } from './modules/v1/categories/category.module';
import { ProfilModule } from './modules/v1/profil/profil.module';
import { ServiceModule } from './modules/v1/service/service.module';
import { FileModule } from './modules/v1/file-delevery/file.module';
import { UserModule } from './modules/v1/user/user.module';
import { AdminModule } from './modules/v1/admin/admin.module';

@Module({
  imports: [AuthModule,AdminModule, CategoryModule , ProfilModule , ServiceModule , FileModule , UserModule] ,
})
export class AppModule {}
