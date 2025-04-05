import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import db from 'src/config/database.config';

import { UserInterface } from '../auth/entity/user-interface';
import { CreateServiceDto } from './dto/service.dto';
import { ServiceInterface } from './entity/service.interface';

@Injectable()
export class ServiceService extends BaseService<ServiceInterface> {
    constructor() {
        super('services');
    }

    async createService(
        dto: CreateServiceDto,
        user: UserInterface,
    ): Promise<number> {
        const existingService = await db('services')
            .where({
                title: dto.title,
                master_id: user.id,
            })
          .first();
        if (existingService) 
            throw new BadRequestException('Service already exists');
        const service = await this.create({
            ...dto,
            master_id: user.id,
        });
        return service.id;
    }
}
