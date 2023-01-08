import { ApiException } from '@app/common';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetUserParams, UserRo } from './user.dtos';
import { NotFoundUserException } from './user.exceptions';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '사용자 목록 조회' })
  @ApiOkResponse({ type: [UserRo] })
  async getAll(): Promise<UserRo[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: '사용자 조회' })
  @ApiOkResponse({ type: UserRo })
  @ApiException(NotFoundUserException)
  async getById(@Param() params: GetUserParams): Promise<UserRo> {
    const user = await this.userService.findById(params.userId);

    if (!user) {
      throw new NotFoundUserException();
    }

    return user;
  }
}
