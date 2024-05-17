import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import dataSource from 'src/data-source/data-source';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(userId: number) {
    return this.userRepository.findOneByOrFail({ id: userId }).catch(() => {
      throw new NotFoundException('User not found');
    });
  }

  async findByEmail(email: string) {
    const user = dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .addSelect('user.password')
      .getOne()
      .catch(() => {
        throw new UnauthorizedException('User Not Found');
      });

    return user;
  }
}
