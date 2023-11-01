import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { DatabaseModule } from 'src/config/db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schemas/room.schema';

@Module({ 
  imports: [  
    DatabaseModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomService, RoomRepository], 
  exports: [RoomService],
  controllers: [RoomController]
})
export class RoomModule {}
