import { Controller, Get, Param, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService){}

  @ApiBearerAuth()
  @Get('/room/:room')
  async getChatsInRoomById(@Param('room') room: string, @Request() req: Request) {
    const userId = req['user']._id;
    return await this.chatService.chatsInRoom(room, userId);
  }

  @ApiBearerAuth()
  @Get('/private/:recipient')
  async getChatsInPrivateById(@Param('recipient') recipient: string, @Request() req: Request) {
    const userId = req['user']._id;
    return await this.chatService.chatsInPrivate(recipient, userId);
  }
}


