import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { HabitsService } from 'src/habits/habits.service';
import { Repository } from 'typeorm';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { Dates } from './entities/date.entity';

@Injectable()
export class DatesService {
  constructor(
    @InjectRepository(Dates)
    private repo: Repository<Dates>,
    private habits: HabitsService,
  ) {}
  create(createDateDto: CreateDateDto) {
    return this.repo.insert(createDateDto);
  }

  findAll() {
    return this.repo.find({ relations: ['habit'] });
  }

  async findByHabitId(id: number): Promise<Dates[]> {
    const entities = await this.repo
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.habit', 'habit') // Include habit table
      .where('entity.habitId = :id', { id })
      .getMany();

    return entities;
  }

  async findSumOfDays(amount: number): Promise<Dates[]> {
    const entities = await this.repo
      .createQueryBuilder('d')
      .select('d.date', 'date')
      .addSelect('EXTRACT(day FROM d.date)', 'day')
      .addSelect('COUNT(*)', 'occurrences')
      .where(
        `d.date BETWEEN CURRENT_DATE - INTERVAL \'${amount} day\' AND CURRENT_DATE`,
      )
      .andWhere('d.is_done = :isDone', { isDone: true })
      .groupBy('d.date')
      .orderBy('d.date')
      .getRawMany();

    return entities;
  }

  async getOccurrencesLastTwelveMonths(): Promise<any[]> {
    const currentDate = moment();
    const twelveMonthsAgo = moment().subtract(12, 'months');

    const result = await this.repo
      .createQueryBuilder('d')
      .select([
        `DATE_TRUNC('month', d."date") AS month`,
        `EXTRACT(month FROM d."date") AS month_number`,
        'COUNT(*) AS occurrences',
      ])
      .where('d."date" BETWEEN :twelveMonthsAgo AND :currentDate', {
        twelveMonthsAgo: twelveMonthsAgo.toDate(),
        currentDate: currentDate.toDate(),
      })
      .andWhere('d.is_done = :isDone', { isDone: true })
      .groupBy('month, month_number')
      .orderBy('month')
      .getRawMany();

    return result;
  }

  update(id: number, updateDateDto: UpdateDateDto) {
    return `This action updates a #${id} date`;
  }

  remove(id: number) {
    return `This action removes a #${id} date`;
  }
}
