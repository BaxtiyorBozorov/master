import { Injectable } from '@nestjs/common';
import { EncryptJWT, importPKCS8, importSPKI, jwtDecrypt } from 'jose';
import { env } from 'src/config/env';

import { TokenPayloadInterface } from '../entity/interfaceses';

@Injectable()
export class TokenService {
    private publicKey = env.JWT_PUBLIC_KEY || '';
    private privateKey = env.JWT_PRIVATE_KEY || '';

    async generateEncryptedToken(
        payload: TokenPayloadInterface,
    ): Promise<string> {

        const secret = await importSPKI(this.publicKey, 'RSA-OAEP');
        const token = await new EncryptJWT({ ...payload })
            .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
            // .setExpirationTime(Math.floor(Date.now() / 1000) + (60 * 60)*24)
            .encrypt(secret);
        return token;
    }

    async decryptToken(encryptedToken: string): Promise<TokenPayloadInterface> {
        const secret = await importPKCS8(this.privateKey, 'RSA-OAEP');
        const { payload } = await jwtDecrypt(encryptedToken, secret);
        return payload as unknown as TokenPayloadInterface;
    }
}
