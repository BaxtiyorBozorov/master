import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { UserInterface } from '../auth/entity/user-interface';
import { CreateServiceDto } from './dto/service.dto';
import { ServiceService } from './service.service';
import { Roles } from 'src/common/decorator/roles-decorators';

@Controller('service')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {}

  @Post('create')
      @Roles('master')
    async createService(
        @Body() dto: CreateServiceDto,
        @Req() req: Request & { user: UserInterface },
    ) {
        const serviceId = await this.serviceService.createService(
            dto,
            req.user,
        );
        return {
            status: 'success',
            message: 'Service created successfully',
            serviceId,
        };
    }
}
