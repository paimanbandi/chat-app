import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UserCreatedResponse } from './responses/userCreated.response';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
   constructor(
    private userRepo: UserRepository,
  ) {}

  async create(
    userDto: CreateUserDto,
  ): Promise<UserCreatedResponse> {
    const encryptedPassword = await bcrypt.hash(userDto.password, 12);
    const user = await this.userRepo.create({
      ...userDto,
      password: encryptedPassword,
    });

    return {
      id: user.id,
    };
  }

  async find() {
    const users = await this.userRepo.find();
    return users;
  }
}
