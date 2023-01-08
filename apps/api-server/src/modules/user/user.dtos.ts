import { enumToString } from '@app/common';
import { Account, AccountType, User } from '@app/schema';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UserAccountRo extends Account {
  @ApiResponseProperty({ example: enumToString(AccountType) })
  @Expose()
  type: AccountType;

  @ApiResponseProperty()
  @Expose()
  profileImage: string | null;

  @ApiResponseProperty()
  @Expose()
  email: string;
}

export class UserRo extends User {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  @Type(() => UserAccountRo)
  account: UserAccountRo;
}

export class GetUserParams {
  @ApiProperty({ description: '사용자 PK' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}
