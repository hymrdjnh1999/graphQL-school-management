import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;
  @Field((type) => [ID])
  @IsUUID('4', { each: true })
  studentIds: string[];
}
