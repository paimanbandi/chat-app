import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtPayload.common';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepo: UserRepository,
  ) {}

  async use(req, res, next) {
    const token = this.extractTokenFromHeader(req);
    console.log(token);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const user = await this.authRepo.findOneByUsername(payload.username);
      if (!user) {
        throw new Error('User does not exists');
      }

      req.user = user;
    } catch (err) {
      throw new UnauthorizedException();
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
