import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createStudent(name: string, courseIds: string[]): Promise<Student> {
    const courses = await this.courseRepository.findByIds(courseIds);
    const student = this.studentRepository.create({ name, courses });
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['courses'] });
  }

  async findOne(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
  }

  async updateStudent(
    id: string,
    name: string,
    courseIds: string[],
  ): Promise<Student> {
    const courses = await this.courseRepository.findBy({ id: In(courseIds) });
    const udpated = await this.studentRepository.update(id, { name, courses });

    return this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
  }

  async removeStudent(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async enrollInCourse(studentId: string, courseId: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!student || !course) {
      throw new Error('Student or Course not found');
    }

    student.courses.push(course);
    return this.studentRepository.save(student);
  }

  async withdrawFromCourse(
    studentId: string,
    courseId: string,
  ): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    if (!student) {
      throw new Error('Student not found');
    }

    student.courses = student.courses.filter(
      (course) => course.id !== courseId,
    );
    return this.studentRepository.save(student);
  }
}
