import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenMiddleware } from './common/token.middleware';
import { RoomModule } from './modules/room/room.module';
import { UserRepository } from './modules/user/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { ChatModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/gateway/chat.gateway';
import { PrivateModule } from './modules/private/private.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    UserModule,
    AuthModule,
    RoomModule,
    ChatModule,
    PrivateModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, UserRepository, {
      provide: 'socket.io',
      useFactory: () => {
        const server = createServer();
        return new Server(server);  // or however you've set up socket.io
      }
    },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        },  
        {
          path: 'users/register',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
