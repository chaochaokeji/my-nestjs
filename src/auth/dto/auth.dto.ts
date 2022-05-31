import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, Matches } from 'class-validator';

export class AuthDto {
  @ApiProperty({ description: '昵称', example: '昵称' })
  @Length(3, 16)
  username: string;

  @ApiProperty({ description: '邮箱', example: '邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '密码', example: '密码' })
  @Length(6, 16)
  password: string;

  @ApiProperty({ description: '验证码', example: '验证码' })
  @Matches(/^[0-9]{4}$/)
  code: string;
}
