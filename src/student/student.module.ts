import { Module } from '@nestjs/common';
import { StudentsController } from './student.controller';
import { StudentsService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentModule {}
