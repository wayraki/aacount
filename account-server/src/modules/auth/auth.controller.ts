import { Controller, Get, Post, Request, Body } from '@nestjs/common';
import { Public } from '../../common/decorator/public.decorator';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('miniprogramLogin')
  async login(@Body() body) {
    return await this.authService.miniprogramLogin(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
