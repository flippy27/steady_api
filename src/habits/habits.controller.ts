import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Get()
  findAll() {
    return this.habitsService.findAll();
  }
  @Get('email')
  Email(){
    return this.habitsService.email();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(+id, updateHabitDto);
  }
  @Patch('restart/:id')
  restartStreak(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.restartStreak(+id, updateHabitDto);
  }
  @Patch('change/:id/:name')
  updateUser(@Param('id')  id: string, @Param('name') name:string, updateHabitDto: UpdateHabitDto) {
    return this.habitsService.updateUser(+id, updateHabitDto, name);
  }
  @Patch('change/:id')
  updateUser2(@Param('id')  id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.updateUser2(+id, updateHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitsService.remove(+id);
  }
}
