import { Body, Controller, Headers, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Login',
    examples: {
      a: {
        summary: 'Login',
        description: '-',
        value: {
          username: 'paiman',
          password: '@ChatApp4Life',
        },
      },
    },
  })
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}

