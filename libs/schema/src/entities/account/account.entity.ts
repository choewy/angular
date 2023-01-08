import { DateTime } from 'luxon';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateTimeColumn } from '@app/schema/columns';
import { AccountType } from './enums';
import { User } from '../user';

@Entity()
export class Account {
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
    comment: '사용자 PK',
  })
  userId: number;

  @PrimaryColumn({
    type: 'enum',
    enum: AccountType,
    comment: '계정 타입',
  })
  type: AccountType;

  @Column({
    type: 'varchar',
    length: 1024,
    comment: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    comment: '프로필 이미지 경로',
  })
  profileImage: string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    comment: '비밀번호',
  })
  password: string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    comment: 'OAuth Access Token',
  })
  accessToken: string | null;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
    comment: 'OAuth Refresh Token',
  })
  refreshToken: string | null;

  @Column({
    type: 'tinyint',
    unsigned: true,
    comment: '적용 여부',
  })
  isApply: boolean;

  @DateTimeColumn({
    update: false,
    comment: '가입일시',
  })
  createdAt: DateTime;

  @DateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @ManyToOne(() => User, (e) => e.accounts, { cascade: ['insert', 'update'] })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = DateTime.local();
  }
}
