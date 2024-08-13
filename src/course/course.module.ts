import { Module } from '@nestjs/common';
import { CoursesController } from './course.controller';
import { CoursesService } from './course.service';
import { Course } from './entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CourseModule {}
