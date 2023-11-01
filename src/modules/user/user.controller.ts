import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({
    summary: 'Create User / User Registration',
  })
  @ApiBody({
    type: CreateUserDto,
    description: '-',
    examples: {
      a: {
        summary: 'Register paiman',
        description: '-',
        value: {
          username: 'paiman',
          password: '@ChatApp4Life',
        },
      },
      b: {
        summary: 'Register bandi',
        description: '-',
        value: {
          username: 'bandi',
          password: '@ChatApp4Life',
        },
      },
    },
  })
  @Post('/register')
  async create(
    @Body() body: CreateUserDto,
  ) {
    return await this.usersService.create(body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Users List',
  })
  @Get('/list')
  async getList() {
    return await this.usersService.find();
  }
}
