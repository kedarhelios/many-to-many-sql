import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { StudentsService } from './student.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('courseIds') courseIds: string[],
  ) {
    return this.studentsService.createStudent(name, courseIds);
  }

  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('courseIds') courseIds: string[],
  ) {
    return this.studentsService.updateStudent(id, name, courseIds);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentsService.removeStudent(id);
  }

  @Post(':id/enroll')
  async enrollInCourse(
    @Param('id') studentId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.studentsService.enrollInCourse(studentId, courseId);
  }

  @Post(':id/withdraw')
  async withdrawFromCourse(
    @Param('id') studentId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.studentsService.withdrawFromCourse(studentId, courseId);
  }
}
