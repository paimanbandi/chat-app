import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserRepository } from 'src/modules/user/user.repository';
import { JwtPayload } from './jwtPayload.common';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (!token) {
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      console.log(payload);

      const user = await this.authRepo.findOneByUsername(payload.username);
      if (!user) {
        throw new Error('User does not exists');
      }

      client['user'] = user;
    console.log(client['user'])
    } catch (err) {
      console.log(err);
    return false;
    }

    return true;
  }
}
