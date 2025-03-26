import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdatePasswordDto, UpdateProfilDto } from "./dto/update-profil.dto";
import { AuthService } from "../auth/auth.service";
import { UserInterface } from "../auth/entity/user-interface";
import { comparePassword, generateHashedPassword } from "src/common/utils/bycrypt.functions";

@Injectable()
export class ProfilService {
  constructor(private readonly authService: AuthService) { }
  
  async updateProfile(dto : UpdateProfilDto , user: UserInterface) {
    await this.authService.update(user.id , dto)
    return {status: 'success', message: 'Profile updated successfully'}
  }

  async updatePassword(dto: UpdatePasswordDto, user: UserInterface) {
    const validUser = await this.authService.findById(user.id)
    if (!validUser) throw new BadRequestException('User not found')
    
    console.log(validUser , user);
    
    const isPasswordMatch = await comparePassword(dto.old_password, validUser.password)
    console.log(isPasswordMatch);
    
    if (!isPasswordMatch) throw new BadRequestException('Invalid password')
    
    const hashedPassword = await generateHashedPassword(dto.new_password)

    await this.authService.update(user.id, { password: hashedPassword })
    return {status: 'success', message: 'Password updated successfully'}
  }
}