import { User } from '@app/schema';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';
import { UserRo } from './user.dtos';

@Injectable()
export class UserService {
  private readonly userRepo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<UserRo[]> {
    const rows = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndMapOne(
        'user.account',
        'user.accounts',
        'account',
        'account.userId = user.id AND account.isApply = 1',
      )
      .getMany();

    return plainToInstance(UserRo, rows, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
    });
  }

  async findById(userId: number): Promise<UserRo> {
    const row = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndMapOne(
        'user.account',
        'user.accounts',
        'account',
        'account.userId = user.id AND account.isApply = 1',
      )
      .where('user.id = :userId', { userId })
      .getOne();

    return plainToInstance(UserRo, row, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
    });
  }
}
