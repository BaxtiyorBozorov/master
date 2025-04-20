import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/roles-decorators';
import { Role } from 'src/common/enums/role.enums';
import { RolesGuard } from 'src/common/guards/auth-role-guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import {
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
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiNotFoundResponse()
@ApiForbiddenResponse()
@ApiInternalServerErrorResponse()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('get-all-users')
    @Roles(Role.admin, Role.superAdmin)
    @ApiOperation({
        summary: 'Get all users',
        description:
            'Get all users and masters , only super admin or admin can access this',
    })
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
    @Roles(Role.admin, Role.superAdmin)
    @ApiOperation({
        summary: 'Delete a user',
        description: 'Only super admin or admin can delete a user',
    })
    async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
        return this.adminService.deleteUserById(Number(id));
    }

    @Post('create-admin')
    @Roles(Role.superAdmin)
    @ApiOperation({
        summary: 'Create a new admin',
        description: 'Only super admin can create a new admin',
    })
    async createAdmin(
        @Body(new ValidationPipe()) dto: CreateAdminDto,
    ): Promise<{ message: string }> {
        return this.adminService.createAdmin(dto);
    }

    @Get('get-all-admins')
    @Roles(Role.superAdmin)
    @ApiOperation({
        summary: 'Get all admins',
        description: 'Only super admin can get all admins',
    })
    async getAllAdmins(): Promise<{
        admins: Partial<UserInterface>[];
    }> {
        return this.adminService.getAllAdmins();
    }
    @Delete('delete-admin/:id')
    @ApiParam({
        name: 'id',
        description: 'Admin ID',
        required: true,
    })
    @Roles(Role.superAdmin)
    @ApiOperation({
        summary: 'Delete an admin',
        description: 'Only super admin can delete an admin',
    })
    async deleteAdmin(@Param('id') id: number): Promise<{ message: string }> {
        return this.adminService.deleteAdminById(Number(id));
    }

    @Put('give-premium/:id')
    @Roles(Role.superAdmin, Role.admin)
    @ApiParam({
        name: 'id',
        description: 'Master ID',
        required: true,
    })
    @ApiOperation({
        summary: 'Give premium to a master',
        description: 'Only super admin or admin can give premium to a master',
    })
    @ApiQuery({
        name: 'days',
        required: true,
        description:
            'Number of days to give premium for days more than 0 and less than 30',
    })
    async givePremium(
        @Param('id') id: number,
        @Query('days') days: number,
    ): Promise<{ message: string }> {
        return this.adminService.givePremiumToMaster(Number(id), days);
    }

    @Put('revoke-premium/:id')
    @ApiParam({
        name: 'id',
        description: 'Master ID',
        required: true,
    })
    @Roles(Role.superAdmin, Role.admin)
    @ApiOperation({
        summary: 'Revoke premium from a master',
        description: 'Only super admin can revoke premium from a master',
    })
    async revokePremium(@Param('id') id: number): Promise<{ message: string }> {
        return this.adminService.revokePremiumFromMaster(Number(id));
    }
}
