import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: MongoRepository<Student>,
  ) {}
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = await this.studentRepository.create({
      firstName,
      lastName,
      id: uuid(),
    });
    return this.studentRepository.save(student);
  }

  async getAllStudent(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOneBy({
      id,
    });
  }

  async getManyStudent(studentIds: string[]): Promise<Student[]> {
    console.log(studentIds);
    const students = await this.studentRepository.find({
      where: { id: { $in: studentIds } },
    });

    return students;
  }
}
