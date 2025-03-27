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
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from 'src/common/swagger/common-errors';
import { UserInterface } from '../auth/entity/user-interface';
import { UpdateMasterDto, UpdatePasswordDto, UpdateProfilDto } from './dto/update-profil.dto';
import { ProfilService } from './profil.service';

@Controller('v1/profil')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  @HttpCode(HttpStatus.OK)
  async updateMaster(
    @Body(new ValidationPipe()) dto: UpdateMasterDto,
    @Req() req: Request & { user: UserInterface },
  ) {
    return this.profilService.updateMaster(dto, req.user);
  }
}
