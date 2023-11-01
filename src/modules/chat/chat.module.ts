import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { DatabaseModule } from 'src/config/db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { RoomService } from '../room/room.service';
import { RoomRepository } from '../room/room.repository';
import { Room, RoomSchema } from 'src/schemas/room.schema';
import { ChatController } from './chat.controller';
import { PrivateService } from '../private/private.service';
import { PrivateRepository } from '../private/private.repository';
import { Private, PrivateSchema } from 'src/schemas/private.schema';

@Module({
  imports: [  
    DatabaseModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Private.name, schema: PrivateSchema }]),
  ],
  providers: [ChatService, ChatRepository, RoomService, RoomRepository, PrivateService, PrivateRepository],
  exports: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
