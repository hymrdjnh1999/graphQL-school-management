import { Student } from 'src/student/student.entity';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Lesson {
  @ObjectIdColumn()
  _id: string;
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column()
  students: string[];
}
