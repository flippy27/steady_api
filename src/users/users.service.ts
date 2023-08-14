import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryBuilder,
  Repository,
  createQueryBuilder,
  JoinColumn,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Dates } from 'src/dates/entities/date.entity';
import { Habit } from 'src/habits/entities/habit.entity';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Dates)
    private datesRepo: Repository<Dates>,
    @InjectRepository(Habit)
    private habitRepo: Repository<Habit>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepo.insert(createUserDto);
  }

  async findAll() {
    return await this.userRepo.find({
      relations: ['habit'],
    });
  }

  findOne(id: number) {
    return this.userRepo.find({
      where: { id: id },
      relations: ['habit'],
    });
  }

  async findOneWithData(id: number) {
    const query = this.userRepo
      .createQueryBuilder('u')
      .select()
      .leftJoinAndMapMany('u.habit', 'u.habit', 'h', 'h.date > :startDate', {
        startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      })
      .where('u.id = :id', { id })
      .orderBy('h.date', 'DESC')
      .getOne();
    return query;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
