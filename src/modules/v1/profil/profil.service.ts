import { BadRequestException, Injectable } from '@nestjs/common';
import {
  comparePassword,
  generateHashedPassword,
} from 'src/common/utils/bycrypt.functions';
import db from 'src/config/database.config';
import { AuthService } from '../auth/auth.service';
import { MasterInterface, UserInterface } from '../auth/entity/user-interface';
import { UpdateMasterDto, UpdatePasswordDto, UpdateProfilDto } from './dto/update-profil.dto';

@Injectable()
export class ProfilService {
  constructor(private readonly authService: AuthService) {}

  async updateProfile(
    dto: UpdateProfilDto,
    user: UserInterface,
  ): Promise<{ status: string; message: string }> {
    await this.authService.update(user.id, dto);
    return { status: 'success', message: 'Profile updated successfully' };
  }

  async updatePassword(
    dto: UpdatePasswordDto,
    user: UserInterface,
  ): Promise<{ status: string; message: string }> {
    const validUser = await this.authService.findById(user.id);
    if (!validUser) throw new BadRequestException('User not found');

    const isPasswordMatch = await comparePassword(
      dto.old_password,
      validUser.password,
    );
    if (!isPasswordMatch) throw new BadRequestException('Invalid password');

    const hashedPassword = await generateHashedPassword(dto.new_password);

    await this.authService.update(user.id, { password: hashedPassword });
    return { status: 'success', message: 'Password updated successfully' };
  }

  async getMe(user: UserInterface): Promise<Partial<UserInterface> | Partial<UserInterface& MasterInterface& {master_id: number}>> {
    const userData = await this.authService.findById(user.id);
    if (!userData) throw new BadRequestException('User not found')  ;
    if (user.role === 'master') {
      const masterData = await db('masters').where('user_id', user.id).first();

      return {
        user_id: user.id,
        master_id: masterData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        role: userData.role,
        email: userData.email,
        phone: userData.phone,
        avatar: userData.avatar,
        category_id: masterData.category_id,
        experience: masterData.experience,
        rating: masterData.rating,
        min_price: masterData.min_price,
        max_price: masterData.max_price,
        address: masterData.address,
        latitude: masterData.latitude,
        longitude: masterData.longitude,
        created_at: masterData.created_at,
        updated_at: masterData.updated_at,
      };
    }

    return {
      id: user.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      role: userData.role,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar

    };
  }

  async updateMaster(
    dto: UpdateMasterDto,
    user: UserInterface,
  ): Promise<void> {
    const masterData = await db('masters').where('user_id', user.id).first();
    if (!masterData) throw new BadRequestException('Master not found');
    await db('masters').where('user_id', user.id).update(dto);
  }
}
