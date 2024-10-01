import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
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
}
