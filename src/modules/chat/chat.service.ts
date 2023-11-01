import { Injectable, } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatToRoomDto } from './dto/chatToRoom.dto';
import { RoomRepository } from '../room/room.repository';
import { Types, isValidObjectId } from 'mongoose';
import { InvalidObjectIdException } from 'src/exceptions/invalidObjectId.exception';
import { ForbiddenAccessException } from 'src/exceptions/unauthorizedAccess.exception';
import { PrivateRepository } from '../private/private.repository';
import { ChatToPrivateDto } from './dto/chatToPrivate.dto';

@Injectable()
export class ChatService {
   constructor(
    private chatRepo: ChatRepository,
    private roomRepo: RoomRepository,
    private privateRepo: PrivateRepository,
  ) {}

  async chatToRoom (
    chatToRoomDto: ChatToRoomDto,
  ) {
    console.log('chatToRoom');
    const { sender, content, room } = chatToRoomDto;
    const chat = await this.chatRepo.create(
      sender,
      content,
    );

    await this.roomRepo.updateMessage(room, chat._id.toString());
  }  

  async chatsInRoom (
    room: string,
    userId: string
  ) {
    if(isValidObjectId(room)) {
      const oRoom =   await this.roomRepo.findById(room);
      const userObjectId = new Types.ObjectId(userId);    
      if(oRoom.participants.includes(userObjectId)) {
        const aChats = await this.chatRepo.getByIDs(oRoom.messages);
        console.log(aChats);
        return aChats;
      } else {
        throw new ForbiddenAccessException('chatsInRoom');
      }
    } else {
      throw new InvalidObjectIdException('room');
    }
  }


  async chatToPrivate (
    chatToPrivateDto: ChatToPrivateDto,
  ) {
    const { sender, content, recipient } = chatToPrivateDto;
    const chat = await this.chatRepo.create(
      sender,
      content,
    );

    await this.privateRepo.create(chat._id.toString(), recipient);
  }  

  async chatsInPrivate (
    recipient: string,
    userId: string,
  ) {
    if(isValidObjectId(recipient)) {
      return this.privateRepo.findMessagesByRecipient(userId, recipient);
    } else {
      throw new InvalidObjectIdException('recipient');
    }
  }
}
