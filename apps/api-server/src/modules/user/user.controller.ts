import { Controller, Get, Param } from '@nestjs/common';
import { GetUserParams, UserRo } from './user.dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserRo[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  async getById(@Param() params: GetUserParams): Promise<UserRo> {
    return this.userService.findById(params.userId);
  }
}
