import { Habit } from "src/habits/entities/habit.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Dates {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.date)
    user:User
    @ManyToOne(()=> Habit, habit=>habit.date)
    habit: Habit
    @Column()
    is_done: boolean
    @Column()
    date: Date

}



/*tabla fechas{
usuario, tipo (finished my homework, learn how to code...), is_done, fecha
tabla usuarios
tabla tipos (finished my homework, learn how to code...)*/
