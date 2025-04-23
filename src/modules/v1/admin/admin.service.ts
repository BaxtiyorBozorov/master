import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { generateHashedPassword } from 'src/common/utils/bycrypt.functions';
import db from 'src/config/database.config';

import { MasterInterface, UserInterface } from '../auth/entity/user-interface';
import { CreateAdminDto } from './dto/create-admin.input';

@Injectable()
export class AdminService {
    constructor() {}

    async getAllUsers(): Promise<{
        users: Partial<UserInterface>[];
        masters: Partial<UserInterface & MasterInterface>[];
    }> {
        const users = await db('users')
            .select(
                'users.id as id',
                'users.firstname',
                'users.lastname',
                'users.phone',
                'users.avatar',
                'users.role',
            )
            .where('users.role', 'user');

        const masters = await db('users')
            .select(
                'users.id as id',
                'users.firstname',
                'users.lastname',
                'users.phone',
                'users.avatar',
                'users.role',
                'masters.is_premium',
                'masters.premium_until',
                'masters.experience',
                'masters.rating_avg',
            )
            .whereNotNull('masters.experience')
            .whereNotNull('users.role')
            .join('masters', 'masters.user_id', '=', 'users.id');

        return {
            users: users,
            masters: masters,
        };
    }

    async deleteUserById(id: number): Promise<{ message: string }> {
        const user = await db('users').where('id', id).first();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.role === 'admin' || user.role === 'super_admin') {
            throw new ForbiddenException(
                'You cannot delete an admin or super admin',
            );
        }

        await db('users').where('id', id).delete();
        return { message: 'User deleted successfully' };
    }

    async createAdmin(data: CreateAdminDto): Promise<{ message: string }> {
        data.password = await generateHashedPassword(data.password);
        data.role = 'admin';
        await db('users').insert(data);

        return { message: 'Admin created successfully' };
    }

    async getAllAdmins(): Promise<{
        admins: Partial<UserInterface>[];
    }> {
        const admins = await db('users')
            .select(
                'users.id as id',
                'users.firstname',
                'users.lastname',
                'users.phone',
                'users.avatar',
                'users.role',
            )
            .where('users.role', 'admin');

        return {
            admins: admins,
        };
    }
    async deleteAdminById(id: number): Promise<{ message: string }> {
        const admin = await db('users').where('id', id).first();
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }
        await db('users').where('id', id).delete();
        return { message: 'Admin deleted successfully' };
    }

    async givePremiumToMaster(id: number, days: number) {
        const master = await db('masters').where('user_id', id).first();

        if (!master) {
            throw new NotFoundException('Master not found');
        }
        if (master.is_premium) {
            throw new ForbiddenException('Master already has premium');
        }
        if (days < 1) {
            throw new ForbiddenException('Days must be greater than 0');
        }
        if (days > 30) {
            throw new ForbiddenException('Days must be less than 30');
        }
        await db('masters')
            .where('user_id', id)
            .update({
                is_premium: true,
                premium_until: this.calculatePremiumEndDate(days),
            });
        return { message: 'Premium granted successfully' };
    }
    async revokePremiumFromMaster(id: number) {
        await db('masters').where('user_id', id).update({
            is_premium: false,
            premium_until: null,
        });
        return { message: 'Premium revoked successfully' };
    }

    private calculatePremiumEndDate(days: number): Date {
        const currentDate = new Date();
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + days);
        return endDate;
    }
}
