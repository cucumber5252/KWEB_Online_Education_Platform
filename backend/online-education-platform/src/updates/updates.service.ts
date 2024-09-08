// src/updates/updates.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getRecentUpdates(userId: number): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['enrolledCourses'],
    });
    if (!user || user.role !== 'student') {
      throw new Error('Invalid user or not a student');
    }

    const courseIds = user.enrolledCourses.map((course) => course.id);
    return this.postRepository.find({
      where: { course: { id: In(courseIds) } },
      order: { createdAt: 'DESC' },
    });
  }
}
