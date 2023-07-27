import { Module } from '@nestjs/common';
import { DatesService } from './dates.service';
import { DatesController } from './dates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dates } from './entities/date.entity';
import { HabitsModule } from 'src/habits/habits.module';

@Module({
  imports:[TypeOrmModule.forFeature([Dates]), HabitsModule,],
  controllers: [DatesController],
  providers: [DatesService]
})
export class DatesModule {}
