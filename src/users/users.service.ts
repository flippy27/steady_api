import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,  ) {}
  create(createUserDto: CreateUserDto) {
    return this.repo.insert(createUserDto);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['habit'],
    });
  }

  findOne(id: number) {
    return this.repo.find({
      where: { id: id },
      relations: ['habit'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
