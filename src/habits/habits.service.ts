import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habit } from './entities/habit.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private repo: Repository<Habit>, private userService: UsersService, private readonly mailerService: MailerService
  ) {}
  create(createHabitDto: CreateHabitDto) {
    return this.repo.insert(createHabitDto);
  }

  findAll() {
   
    return this.repo.find();
  }
  email(){
    this.mailerService.sendMail({
      to: 'Flipflipflipflip19@gmail.com      ', // list of receivers
      from: 'marucero33@gmail.com', // sender address
      subject: 'la wea que funciona riko ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b> mi primera página web  hola esta es mi pagina web los quiero mucho noelia estoy haciendo mi pagina web que emocion bueno y ahora que hago </b>', // HTML body content
    }).then((success) => {
      return console.log(success)
    })
    .catch((err) => {
      return console.log(err)
    });

  }

  findOne(id: number) {
    return this.repo.findBy({ id });
  }
  async findStreak(id: number) {
    let habit = await this.findOne(id);
    return habit[0].streak;
  }

  async update(id: number, UpdateHabitDto: UpdateHabitDto) {
    let currentStreak = await this.findStreak(id);
    let updatedStreak = currentStreak + 1;
    return this.repo.update(id, { streak: updatedStreak });
  }
  async restartStreak(id: number, UpdateHabitDto: UpdateHabitDto) {
    return this.repo.update(id, { streak: 0 });
    
  }

  async updateUser(
    id: number,
    UpdateHabitDto: UpdateHabitDto,
    newName: string,
  ) {
    return this.repo.update(id, { name: newName });
  }

  async updateUser2(id: number, UpdateHabitDto: UpdateHabitDto) {
    let habit = await this.repo.findOneBy({ id });
    habit.name = UpdateHabitDto.name;

    return this.repo.update(id, habit);
  }

  remove(id: number) {
    return `This action removes a #${id} habit`;
  }
}
