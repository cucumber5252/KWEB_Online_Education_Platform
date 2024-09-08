// src/course/course.service.ts

import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(courseData: Partial<Course>, professor: User): Promise<Course> {
    const course = this.courseRepository.create({ ...courseData, professor });
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findByProfessor(professor: User): Promise<Course[]> {
    return this.courseRepository.find({
      where: { professor: { id: professor.id } },
      relations: ['professor'],
    });
  }

  async enrollStudent(courseId: number, student: User): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const isAlreadyEnrolled = course.students.some((s) => s.id === student.id);
    if (isAlreadyEnrolled) {
      throw new ConflictException('Student is already enrolled in this course');
    }

    try {
      await this.courseRepository
        .createQueryBuilder()
        .relation(Course, 'students')
        .of(courseId)
        .add(student.id);

      return course;
    } catch (error) {
      console.error('Error enrolling student:', error);
      throw new InternalServerErrorException(
        'Failed to enroll student. Please try again.',
      );
    }
  }

  async getEnrolledCourses(studentId: number): Promise<Course[]> {
    const student = await this.userRepository.findOne({
      where: { id: studentId },
      relations: ['enrolledCourses'],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student.enrolledCourses;
  }

  async getStudentsByCourse(courseId: number): Promise<User[]> {
    const students = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.enrolledCourses', 'course', 'course.id = :courseId', {
        courseId,
      })
      .getMany();
    return students;
  }

  async removeStudentFromCourse(
    courseId: number,
    studentId: number,
  ): Promise<void> {
    const student = await this.userRepository.findOne({
      where: { id: studentId },
      relations: ['enrolledCourses'],
    });

    if (!student) {
      throw new Error('Student not found');
    }

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'enrolledCourses')
      .of(student)
      .remove(courseId);
  }
}
