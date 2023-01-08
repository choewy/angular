import { Account, AccountType, User } from '@app/schema';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UserAccountRo extends Account {
  @Expose()
  type: AccountType;

  @Expose()
  profileImage: string | null;

  @Expose()
  email: string;
}

export class UserRo extends User {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => UserAccountRo)
  account: UserAccountRo;
}

export class GetUserParams {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}
