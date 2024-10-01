import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}
  async createLesson({
    name,
    startDate,
    endDate,
  }: CreateLessonInput): Promise<Lesson> {
    const lesson = await this.lessonRepository.create({
      name,
      startDate,
      endDate,
      id: uuid(),
    });
    return await this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOneBy({
      id,
    });
  }

  async getAllLesson(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }
}
