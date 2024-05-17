import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public.decorator';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
    description: 'Login authentication',
  })
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request & { user: User }) {
    return await this.authService.refreshToken(req.user);
  }
}
