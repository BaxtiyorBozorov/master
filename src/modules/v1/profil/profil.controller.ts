import {
  Body,
  Controller,
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
import { UpdatePasswordDto, UpdateProfilDto } from './dto/update-profil.dto';
import { ProfilService } from './profil.service';

@Controller('v1/profil')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiUnauthorizedResponse()
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

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
}
