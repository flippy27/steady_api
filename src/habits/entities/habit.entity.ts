import { type } from "os";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Habit {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @ManyToOne(type=> User, user => user.habit )
    user: User
    @Column({default:0})
    streak: number
}
