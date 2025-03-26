import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import db from 'src/config/database.config';
import { TokenService } from 'src/modules/v1/auth/service/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        const payload = await this.tokenService.decryptToken(token);
        const user = await db('users').where({ id: payload.id }).first();
        if (!user) throw new UnauthorizedException('User unauthorized');
        request.user = payload;
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'] ?? '';

        const [type, token] = authHeader.split(' ');

        return type === 'Bearer' ? token : undefined;
    }
}
