import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createCourse(title: string, studentIds: string[]): Promise<Course> {
    const students = await this.studentRepository.findByIds(studentIds);
    const course = this.courseRepository.create({ title, students });
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['students'] });
  }

  async findOne(id: string): Promise<Course> {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async updateCourse(
    id: string,
    title: string,
    studentIds: string[],
  ): Promise<Course> {
    const students = await this.studentRepository.findByIds(studentIds);
    await this.courseRepository.update(id, { title, students });
    return this.courseRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async removeCourse(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }

  async addStudent(courseId: string, studentId: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });

    if (!course || !student) {
      throw new Error('Course or Student not found');
    }

    course.students.push(student);
    return this.courseRepository.save(course);
  }

  async removeStudent(courseId: string, studentId: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });

    if (!course) {
      throw new Error('Course not found');
    }

    course.students = course.students.filter(
      (student) => student.id !== studentId,
    );
    return this.courseRepository.save(course);
  }
}
