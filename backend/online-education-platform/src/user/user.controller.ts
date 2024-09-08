// src/user/user.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() userData: Partial<User>,
  ): Promise<{ data: { accessToken: string; role: string } }> {
    const user = await this.userService.register(userData);
    const token = await this.userService.generateTestAccessToken(user.id);
    return { data: { accessToken: token, role: user.role } };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
  ): Promise<{ data: { accessToken: string; role: string } }> {
    const token = await this.userService.generateTestAccessToken(req.user.id);
    return { data: { accessToken: token, role: req.user.role } };
  }

  @Post('generate-test-token/:userId')
  async generateTestAccessToken(
    @Param('userId') userId: number,
  ): Promise<{ data: { access_token: string } }> {
    const token = await this.userService.generateTestAccessToken(userId);
    return { data: { access_token: token } };
  }

  @Post('add-test-user')
  async addTestUser(): Promise<{ data: User }> {
    const testUser: Partial<User> = {
      username: 'testuser',
      password: 'password',
      name: 'Test User',
      studentId: '123456',
      role: 'student',
    };
    const user = await this.userService.register(testUser);
    return { data: user };
  }
}
