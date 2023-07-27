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
   
    return this.repo.find({relations: ['date']});
  
  }
  email(){
    this.mailerService.sendMail({
      to: '', // list of receivers
      from: 'marucero33@gmail.com', // sender address
      subject: 'pido perdón ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b> Estimado Flip, Espero que este mensaje le encuentre bien. Me dirijo a usted con el propósito de ofrecerle mis más sinceras disculpas por el correo electrónico que le envié anteriormente. Reconozco plenamente mi error y lamento profundamente cualquier inconveniente que haya causado. Permítame explicarle lo sucedido. Resulta que, durante el proceso de desarrollo y pruebas de los endpoints, dejé guardado su correo electrónico en el código. Sin darme cuenta, al realizar pruebas recientes, el sistema envió automáticamente el correo electrónico que usted recibió sin mi intención de hacerlo. Reconozco plenamente mi falta de atención y le aseguro que tomaré todas las medidas necesarias para evitar que esto vuelva a ocurrir en el futuro. Valoramos enormemente la relación que hemos construido con usted y su organización, y le ruego que no permita que este incidente afecte nuestra colaboración. Me comprometo a revisar detenidamente mis procesos y garantizar que se tomen precauciones adicionales para evitar situaciones similares en adelante. Además, si hay algo que pueda hacer para remediar esta situación o para compensarle por cualquier inconveniente causado, por favor, no dude en hacérmelo saber. Una vez más, lamento sinceramente el error cometido y le pido disculpas por cualquier molestia o preocupación que haya causado. Agradezco su comprensión y le reitero mi compromiso de mejorar en el futuro. Atentamente, Hernández, Marcelo Ismael. </b>', // HTML body content
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
