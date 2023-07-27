import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Post()
  create(@Body() createDateDto: CreateDateDto) {
    return this.datesService.create(createDateDto);
  }

  @Get()
  findAll() {
    return this.datesService.findAll();
  }

  @Get(':id')
  findAllByHabitId(@Param('id') id: string) {
    return this.datesService.findByHabitId(+id);
  }
  @Get('amount/:amount')
  findSumOfDays(@Param('amount') amount: number) {
    return this.datesService.findSumOfDays(+amount);
  }
  @Get('yearly/hola')
  getDatesCountPerMonthLast12Months() {
    
    return this.datesService.getOccurrencesLastTwelveMonths();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateDto: UpdateDateDto) {
    return this.datesService.update(+id, updateDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datesService.remove(+id);
  }
}
