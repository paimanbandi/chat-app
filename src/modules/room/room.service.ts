import { Injectable, Request } from '@nestjs/common';
import { CreateRoomDto } from './dto/createRoom.dto';
import { RoomCreatedResponse } from './responses/createdRoom.response';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
   constructor(
    private roomRepo: RoomRepository,
  ) {}

  async create(
    roomDto: CreateRoomDto,
    userId: string
  ): Promise<RoomCreatedResponse> {
    const room = await this.roomRepo.create(
      roomDto.name,
      userId
    );

    return {
      id: room.id,
      name: roomDto.name
    };
  }  
  async join(
    roomId: string,
    userId: string
  ) {
    await this.roomRepo.join(
      roomId,
      userId
    );

    return {
      roomId: roomId,
      userId: userId
    };
  }  

  async getList(
  ) {
    const rooms = await this.roomRepo.getList();

    return rooms;
  }  
}
