//src/course/course.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.courses)
  professor: User;

  @OneToMany(() => Post, (post) => post.course)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.enrolledCourses)
  @JoinTable()
  students: User[];
}
