// src/post/post.controller.ts

import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('api/courses/:courseId/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Param('courseId') courseId: number,
    @Body() { title, content }: { title: string; content: string },
  ): Promise<{ data: PostEntity }> {
    const post = await this.postService.create(courseId, title, content);
    return { data: post };
  }

  @Get()
  async findByCourse(
    @Param('courseId') courseId: number,
  ): Promise<{ data: PostEntity[] }> {
    const posts = await this.postService.findByCourse(courseId);
    return { data: posts };
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: number): Promise<{ message: string }> {
    await this.postService.delete(postId);
    return { message: 'Post deleted successfully' };
  }
}
