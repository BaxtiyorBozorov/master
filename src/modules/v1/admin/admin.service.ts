import { Injectable, NotFoundException } from '@nestjs/common';
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
        await db('users').where('id', id).delete();
        return { message: 'User deleted successfully' };
    }

    async createAdmin(data: CreateAdminDto): Promise<{ message: string }> {
        data.password = await generateHashedPassword(data.password);
        data.role = 'admin';
        console.log(data);

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
      
      console.log(admins );
      
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
}
