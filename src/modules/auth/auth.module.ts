import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from "src/config/db/db.module";
import { authProviders } from "./auth.provider";
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from "../user/user.repository";
import { User, UserSchema } from "src/schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [ 
    ConfigModule.forRoot(),
    DatabaseModule,   
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: `${process.env.JWT_EXPIRY_HOUR}h`,
      },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    ...authProviders,
  ],
  exports: [AuthService ],
})
export class AuthModule {}
