import { User } from "src/users/entities/user.entity";

export class CreateHabitDto {
  id: number;
  name: string;
  streak: number;
  user: User
}
