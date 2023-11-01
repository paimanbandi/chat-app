import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/createRoom.dto';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('myMethod should return expected value', () => {
    const body: CreateRoomDto = {
      name: '30+'
    };
    const userId: string = '6540cc5590255060e3e32e16';
    
    expect(service.create(body, userId)).toBeDefined();
  });
});
