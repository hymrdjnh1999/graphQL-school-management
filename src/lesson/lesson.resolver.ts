import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  @Query((returns) => LessonType)
  async getLesson(@Args('id') id: string): Promise<LessonType> {
    return await this.lessonService.getLesson(id);
  }
  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => [LessonType])
  async getAllLesson(): Promise<LessonType[]> {
    return await this.lessonService.getAllLesson();
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLesson: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLesson;
    return await this.lessonService.assignStudentsToLesson(
      lessonId,
      studentIds,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return await this.studentService.getManyStudent(lesson.students);
  }
}
