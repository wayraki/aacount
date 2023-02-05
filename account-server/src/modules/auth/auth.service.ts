import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  async miniprogramLogin(body: any) {
    const res = await axios('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        js_code: body.code,
        grant_type: 'authorization_code',
        appid: this.configService.get('APP_ID'),
        secret: this.configService.get('SECRET'),
      },
    });
    const payload = {
      openid: res.data.openid,
      session_key: res.data.session_key,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
