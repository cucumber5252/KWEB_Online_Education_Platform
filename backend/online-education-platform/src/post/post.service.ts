// src/post/post.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(
    courseId: number,
    title: string,
    content: string,
  ): Promise<Post> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    const newPost = this.postRepository.create({
      title,
      content,
      course,
      createdAt: new Date(),
    });
    return this.postRepository.save(newPost);
  }

  async findByCourse(courseId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { course: { id: courseId } },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(postId: number): Promise<void> {
    await this.postRepository.delete(postId);
  }
}
