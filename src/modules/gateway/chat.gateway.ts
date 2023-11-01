import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WsJwtGuard } from 'src/common/socket.guard';
import { RoomService } from '../room/room.service';
import { ChatService } from '../chat/chat.service';
import { ChatToRoomDto } from '../chat/dto/chatToRoom.dto';
import { ChatToPrivateDto } from '../chat/dto/chatToPrivate.dto';

@WebSocketGateway({ namespace: '/chat', cors: true })
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private roomsService: RoomService, private chatService: ChatService) {}
  
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    const userId = client['user']['_id'];
    client.join(room);
    await this.roomsService.join(room, userId);
    client.broadcast.to(room).emit('message', `User with ID ${userId} has joined the room.`);
  }

  @SubscribeMessage('chatToRoom')
  async handleChatToRoom(client: Socket, { room, content }: { room: string; content: string }) {
    const sender = client['user']['_id'];
    const chatToRoomDto: ChatToRoomDto = {
      room,
      content,
      sender
    };
    await this.chatService.chatToRoom(chatToRoomDto);
    
    client.broadcast.to(room).emit('message', content);
  }

  @SubscribeMessage('chatsInRoom')
  async handleChatsInRoom(client: Socket, room: string) {
    try {
      const userId = client['user']['_id'];
      const chatHistory =   await this.chatService.chatsInRoom(room, userId);
      client.emit('chatsInRoomResponse', chatHistory);
    } catch (error) {
      client.emit('chatsInRoomResponseError', 'Error fetching room chat history.');
    }
  }

  @SubscribeMessage('chatToPrivate')
  async handleChatToPrivate(client: Socket, { recipient, content }: { recipient: string; content: string }) {
    const sender = client['user']['_id'];
    const chatToPrivateDto: ChatToPrivateDto = {
      recipient,
      content,
      sender
    };
    client.join(recipient);
    await this.chatService.chatToPrivate(chatToPrivateDto);
    client.to(recipient).emit('message', content);
  }


  @SubscribeMessage('chatsInPrivate')
  async handleChatsInPrivate(client: Socket, recipient: string) {
    try {
      const userId = client['user']['_id'];
      const chatHistory =   await this.chatService.chatsInPrivate(recipient, userId);
      client.emit('chatsInPrivateResponse', chatHistory);
    } catch (error) {
      client.emit('chatsInPrivateResponseError', 'Error fetching private chat history.');
    }
  }
}
