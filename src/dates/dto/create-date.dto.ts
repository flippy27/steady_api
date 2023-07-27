import { Habit } from "src/habits/entities/habit.entity";
import { User } from "src/users/entities/user.entity";

export class CreateDateDto {
    id: number;
    user:User
    habit: Habit
    is_done: boolean
    date: Date
}