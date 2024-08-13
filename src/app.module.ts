import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33066,
      username: 'root',
      password: 'root',
      database: 'many_to_many_try',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
