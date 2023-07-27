import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Dates } from 'src/dates/entities/date.entity';
import { Habit } from 'src/habits/entities/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Dates,Habit]),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

