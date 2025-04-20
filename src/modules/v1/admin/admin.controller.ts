import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { MasterInterface, UserInterface } from '../auth/entity/user-interface';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    @Get('get-all-users')
    getAllUsers(): Promise<{
        users: Partial<UserInterface>[];
        masters: Partial<UserInterface & MasterInterface>[];
    }> {
        return this.adminService.getAllUsers();
    }

    @Delete('delete-user/:id')
    @ApiParam({
        name: 'id',
        description: 'User ID',
        required: true,
    })
    async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
        return this.adminService.deleteUserById(Number(id));
    }
  
  
}
