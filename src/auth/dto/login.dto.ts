import { ApiProperty, PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

/**
 * 登录数据传输对象
 */
export class LoginDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {
  @ApiProperty({ example: 'admin@admin.com' })
  email;

  @ApiProperty({ example: 'a123456' })
  password;
}
