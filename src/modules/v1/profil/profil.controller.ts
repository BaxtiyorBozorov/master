import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles-decorators';
import { RolesGuard } from 'src/common/guards/auth-role-guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from 'src/common/swagger/common-errors';
import { UserInterface } from '../auth/entity/user-interface';
import {
  UpdateMasterDto,
  UpdatePasswordDto,
  UpdateProfilDto,
} from './dto/update-profil.dto';
import { ProfilService } from './profil.service';

@Controller('v1/profil')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiUnauthorizedResponse()
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() req: Request & { user: UserInterface }) {
    return this.profilService.getMe(req.user);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Body(new ValidationPipe()) dto: UpdateProfilDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.profilService.updateProfile(dto, req.user);
  }

  @Put('update-password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Body(new ValidationPipe()) dto: UpdatePasswordDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.profilService.updatePassword(dto, req.user);
  }

  @Put('update-master')
  @Roles('master')
  @HttpCode(HttpStatus.OK)
  async updateMaster(
    @Body(new ValidationPipe()) dto: UpdateMasterDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    await this.profilService.updateMaster(dto, req.user);
    return { status: 'success', message: 'Master updated successfully' };
  }
}
