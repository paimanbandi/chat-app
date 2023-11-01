import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/createRoom.dto';

@ApiTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(private roomsService: RoomService) {}

  @ApiOperation({
    summary: 'Create Room',
  })
  @ApiBody({
    type: CreateRoomDto,
    description: '-',
    examples: {
      a: {
        summary: 'Create Room Khusus Cowok',
        description: '-',
        value: {
          name: 'Khusus Cowok',
        },
      },
      b: {
        summary: 'NestJS Only',
        description: '-',
        value: {
          name: 'bandi',
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post('/create')
  async create(
    @Body() body: CreateRoomDto,
    @Request() req: Request
  ) {
    const userId = req['user']._id;
    return await this.roomsService.create(body, userId);
  }  

  @ApiBearerAuth()
  @Get('/list')
  async getList() {
    return await this.roomsService.getList();
  }  

  // @ApiBearerAuth()
  // @Get('/:id')
  // async getById(@Param('id') id: string) {
  //   return await this.roomsService.getDetail(id);
  // }
}
