import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Student, (student) => student.courses)
  @JoinTable() // This decorator is used on one side of the many-to-many relationship
  students: Student[];
}
