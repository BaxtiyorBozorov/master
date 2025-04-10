import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

import { MasterInterface, UserInterface } from '../auth/entity/user-interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('get-all-masters')
    async getAllMasters(): Promise<{
        data: Partial<UserInterface & MasterInterface>[];
    }> {
        return this.userService.getAllMasters();
    }

    @Get('masters-by-category-id/:id')
    @ApiParam({
        name: 'id',
        description: 'Category ID',
    })
    async createUser(
        @Param('id') categoryId: string,
    ): Promise<{ data: Partial<UserInterface & MasterInterface>[] }> {
        return this.userService.getAllMastersByCategoryId(categoryId);
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

    @Get('masters/nearest')
    @ApiQuery({
        name: 'lat',
    })
    @ApiQuery({ name: 'lng' })
    async findNeares(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ): Promise<{
        data: Partial<UserInterface & MasterInterface>[];
    }> {
        return this.userService.findNearest(lat, lng);
    }
}
