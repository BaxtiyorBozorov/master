import { Injectable } from '@nestjs/common';
import * as jose from 'jose';

@Injectable()
export class TokenService {
  // Maxfiy kalit (real loyihada buni .env faylidan olish tavsiya etiladi)
  private readonly secretKey = new TextEncoder().encode(
    process.env.SECRET_KEY || 'a'.repeat(32), // 32 bayt uzunlikdagi kalit
);

  constructor() { }
  async generateEncryptedToken(payload: Record<string, any>): Promise<string> {
    
      const encryptedToken = await new jose.EncryptJWT(payload)
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }) // Direct kalit va AES 256 GCM
        .setIssuedAt() // Token yaratilgan vaqt
        // .setExpirationTime('1d') // Token amal qilish muddati (1 soat)
        .encrypt(this.secretKey);

    
      return encryptedToken;
    
  }

  // Qo'shimcha: Tokenni deshifrlash uchun metod
  async decryptToken(token: string): Promise<Record<string, any>> {
    
      const { payload } = await jose.jwtDecrypt(token, this.secretKey);
      return payload;
  
  }
}