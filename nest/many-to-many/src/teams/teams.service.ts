import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllTeams() {
    return await this.teamRepository.find({
      relations: {
        users: true,
      },
    });
  }

  async getTeam(id: number) {
    const team = await this.teamRepository.findOne({
      relations: {
        users: true,
      },
      where: { id },
    });

    if (!team) {
      throw new NotFoundException();
    }

    return team;
  }

  async createTeam(body: CreateTeamDto) {
    const { name } = body;
    const team = await this.teamRepository.findOne({ where: { name } });

    if (team) {
      throw new ConflictException();
    }

    await this.teamRepository.insert(body);
  }

  async addUserToTeam(teamId: number, userId: number) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: { users: true },
    });

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!team || !user) {
      throw new NotFoundException();
    }

    const userList = team.users;
    team.users = [...userList, user];
    await this.teamRepository.save(team);
  }

  async deleteUserFomTeam(teamId: number, userId: number) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: { users: true },
    });

    const user = team.users.find((user) => user.id === userId);

    if (!team || !user) {
      throw new NotFoundException();
    }

    const userList = team.users.filter((user) => user.id !== userId);
    team.users = userList;
    await this.teamRepository.save(team);
  }
}
