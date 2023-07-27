import { Dates } from 'src/dates/entities/date.entity';
import { Habit } from 'src/habits/entities/habit.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @OneToMany(() => Habit, (habit) => habit.user)
  habit: Habit[];
  @OneToMany(() => Dates, (date) => date.user)
  date: Dates[];
}
