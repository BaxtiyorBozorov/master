import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles-decorators';
import { RolesGuard } from 'src/common/guards/auth-role-guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import {
    ApiAuth,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from 'src/common/swagger/common-errors';
import { MasterInterface, UserInterface } from '../auth/entity/user-interface';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.input';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiAuth()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiNotFoundResponse()
@ApiForbiddenResponse()
@ApiInternalServerErrorResponse()
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

    @Post('create-admin')
    @Roles('super_admin')
    @ApiOperation({
        summary: 'Create a new admin',
        description: 'Only super admin can create a new admin',
    })
    async createAdmin(
        @Body(new ValidationPipe()) dto: CreateAdminDto,
    ): Promise<{ message: string }> {
        return this.adminService.createAdmin(dto);
    }
}
