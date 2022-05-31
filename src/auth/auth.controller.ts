import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('权限 auth')
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * 账号查重
   */
  @Get('username/:username')
  @ApiOperation({ summary: '昵称查重' })
  @ApiParam({ name: 'username', type: 'string' })
  async checkUsername(@Param('username') username) {
    return await this.usersService.isHasUsername(username);
  }

  /**
   * 邮箱查重
   */
  @Get('email/:email')
  @ApiOperation({ summary: '邮箱查重' })
  @ApiParam({ name: 'email', type: 'string' })
  async checkEmail(@Param('email') email) {
    return await this.usersService.isHasEmail(email);
  }

  /**
   * 注册
   */
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const { email, password } = registerDto;

    await this.usersService.insertOne({
      email,
      password: bcrypt.hashSync(password),
    });

    return {
      success: true,
    };
  }

  /**
   * 登录
   */
  @Post('login/account')
  @ApiOperation({ summary: '登录' })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
    const { access_token } = await this.authService.login(req.user);
    return {
      success: true,
      access_token,
    };
  }

  @Post('login/outLogin')
  @ApiOperation({ summary: '退出登录' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async outLogin(): Promise<any> {
    return {
      success: true,
      data: {},
    };
  }

  /**
   * 当前用户信息
   */
  @Get('currentUser')
  @ApiOperation({ summary: '当前用户信息' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async userInfo(@Request() req): Promise<any> {
    const { userId } = req.user;
    return {
      success: true,
      data: await this.usersService.findById(userId),
    };
  }
}
