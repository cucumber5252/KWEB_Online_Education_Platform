// src/post/post.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Course } from '../course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Course])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
