import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { NestUserModelProvider, User, UserSchema } from 'src/schemas/user.schema';
import { DatabaseModule } from 'src/config/db/db.module';

@Module({
  imports: [  
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService, UserRepository, NestUserModelProvider],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

