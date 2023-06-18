import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitDto } from './create-habit.dto';
import { User } from "src/users/entities/user.entity";

export class UpdateHabitDto {
  id: number;
  name: string;
  streak?: number;
  user: User
}