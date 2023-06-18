import { type } from "os"
import { Habit } from "src/habits/entities/habit.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name: string
    @Column()
    email: string
    @OneToMany(type => Habit, habit=> habit.user)
    habit: Habit

}
