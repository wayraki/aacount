import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import envConfig from '../config/env';

import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { BillModule } from './modules/bill/bill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, BillModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'), //主机名
        port: configService.get<number>('DB_PORT', 3306), //端口号
        username: configService.get('DB_USERNAME', 'root'), //用户名
        password: configService.get('DB_PASSWORD', '123456'), //密码
        database: configService.get('DB_DATABASE', 'aacount'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
    GroupModule,
    BillModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
