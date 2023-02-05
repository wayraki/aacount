import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '手机号' })
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  @IsNotEmpty()
  readonly nickName: string;

  @ApiProperty({ description: '头像' })
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty({ description: 'openId' })
  readonly openId: string;

  @ApiProperty({ description: 'unionId' })
  readonly unionId: string;
}
