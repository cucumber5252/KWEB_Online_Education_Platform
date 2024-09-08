//src/user/user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  studentId: string;

  @Column()
  role: 'professor' | 'student';

  @ManyToMany(() => Course, (course) => course.students, { cascade: true })
  enrolledCourses: Course[];

  @OneToMany(() => Course, (course) => course.professor)
  courses: Course[];
}
