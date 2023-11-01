import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/jwtPayload.common';
import { UserRepository } from '../user/user.repository';
import { LoginResponse } from './responses/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credential!');
    }
    const claim: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(claim)

    return {
      accessToken,
    };
  }
}
