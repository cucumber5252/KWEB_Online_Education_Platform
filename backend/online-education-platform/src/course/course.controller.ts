// src/course/course.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@Controller('api/courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() courseData: Partial<Course>,
    @Request() req: any,
  ): Promise<{ data: Course }> {
    const course = await this.courseService.create(courseData, req.user);
    return { data: course };
  }

  @Get()
  async findAll(): Promise<{ data: Course[] }> {
    const courses = await this.courseService.findAll();
    return { data: courses };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findByProfessor(@Request() req: any): Promise<{ data: Course[] }> {
    const professor: User = req.user;
    const courses = await this.courseService.findByProfessor(professor);
    return { data: courses };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':courseId/enroll')
  async enroll(
    @Param('courseId') courseId: number,
    @Request() req: any,
  ): Promise<{ data: Course }> {
    const course = await this.courseService.enrollStudent(courseId, req.user);
    return { data: course };
  }

  @UseGuards(JwtAuthGuard)
  @Get('enrolled')
  async getEnrolledCourses(@Request() req: any): Promise<{ data: Course[] }> {
    const courses = await this.courseService.getEnrolledCourses(req.user.id);
    return { data: courses };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':courseId/students')
  async getStudentsByCourse(
    @Param('courseId') courseId: number,
  ): Promise<{ data: User[] }> {
    const students = await this.courseService.getStudentsByCourse(courseId);
    return { data: students };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':courseId/students/:studentId')
  async removeStudentFromCourse(
    @Param('courseId') courseId: number,
    @Param('studentId') studentId: number,
  ): Promise<{ message: string }> {
    await this.courseService.removeStudentFromCourse(courseId, studentId);
    return { message: 'Student removed from course successfully' };
  }
}
