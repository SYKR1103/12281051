import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepo: Repository<User>;
  async createUser(c: CreateUserDto) {
    const newUser = await this.userRepo.create(c);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findUserByEmail(email: string) {
    const user = this.userRepo.findOneBy({ email });
    if (!user) throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserById(id: string) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    return user;
  }
}
