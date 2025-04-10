import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

import { MasterInterface, UserInterface } from '../auth/entity/user-interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('get-all-masters/:id')
    @ApiParam({
        name: 'id',
        description: 'Category ID',
    })
    async createUser(
        @Param('id') categoryId: string,
    ): Promise<{ data: Partial<UserInterface & MasterInterface>[] }> {
        return this.userService.getAllMasters(categoryId);
    }

    @Get('get-master-by-id/:id')
    @ApiParam({
        name: 'id',
        description: 'Master ID',
    })
    async getMasterById(
        @Param('id') id: string,
    ): Promise<Partial<UserInterface & MasterInterface>> {
        return this.userService.getMasterById(id);
    }
}
