import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}
  @Query((returns) => [StudentType])
  async getAllStudents(): Promise<StudentType[]> {
    return await this.studentService.getAllStudent();
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return await this.studentService.createStudent(createStudentInput);
  }

  @Query((returns) => StudentType)
  async getStudentById(@Args('studentId') id: string): Promise<StudentType> {
    return await this.studentService.getStudentById(id);
  }
}
