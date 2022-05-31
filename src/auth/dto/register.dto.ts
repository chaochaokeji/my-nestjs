import { PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

/**
 * 注册数据传输对象
 */
export class RegisterDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {}
