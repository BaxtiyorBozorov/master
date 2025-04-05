import { Module } from "@nestjs/common";

import { ProfilService } from "./profil.service";
import { ProfilController } from "./profil.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [ProfilService],
  exports: [ProfilService],
  controllers: [ProfilController],
})

export class ProfilModule {}