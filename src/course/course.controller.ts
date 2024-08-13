import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CoursesService } from './course.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('studentIds') studentIds: string[],
  ) {
    return this.coursesService.createCourse(title, studentIds);
  }

  @Get()
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('studentIds') studentIds: string[],
  ) {
    return this.coursesService.updateCourse(id, title, studentIds);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.coursesService.removeCourse(id);
  }

  @Post(':id/add-student')
  async addStudent(
    @Param('id') courseId: string,
    @Body('studentId') studentId: string,
  ) {
    return this.coursesService.addStudent(courseId, studentId);
  }

  @Post(':id/remove-student')
  async removeStudent(
    @Param('id') courseId: string,
    @Body('studentId') studentId: string,
  ) {
    return this.coursesService.removeStudent(courseId, studentId);
  }
}
