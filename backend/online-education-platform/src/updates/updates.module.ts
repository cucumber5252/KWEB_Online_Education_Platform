// src/updates/updates.module.ts

import { Module } from '@nestjs/common';
import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/course.entity';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Post, User])],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
