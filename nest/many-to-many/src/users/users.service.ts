import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      relations: {
        teams: true,
      },
    });
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({
      relations: {
        teams: true,
      },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(body: CreateUserDto) {
    const { account } = body;

    const user = await this.userRepository.findOne({ where: { account } });

    if (user) {
      throw new ConflictException();
    }
    await this.userRepository.insert(body);
  }
}
