import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddOrDeleteUserDto } from './dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { How } from './interfaces';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getTeams() {
    return await this.teamsService.getAllTeams();
  }

  @Get(':id')
  async getOneTeam(@Param('id') id: number) {
    return await this.teamsService.getTeam(id);
  }

  @Put(':id')
  async addOrDeleteUser(
    @Param('id') id: number,
    @Query('how') how: How,
    @Body() body: AddOrDeleteUserDto,
  ) {
    switch (how) {
      case How.add:
        return await this.teamsService.addUserToTeam(id, body.userId);
      case How.delete:
        return await this.teamsService.deleteUserFomTeam(id, body.userId);
      default:
        throw new BadRequestException();
    }
  }

  @Post()
  async createTeam(@Body() body: CreateTeamDto) {
    return await this.teamsService.createTeam(body);
  }
}
