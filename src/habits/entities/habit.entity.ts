import { type } from "os";
import { Dates } from "src/dates/entities/date.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Habit {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @ManyToOne(()=> User, user => user.habit )
    user: User
    @OneToMany(()=> Dates, date => date.habit )
    date: Dates[]
    @Column({default:0})
    streak: number
}
