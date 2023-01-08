import { DateTimeColumn } from '@app/schema/columns';
import { DateTime } from 'luxon';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: 'PK',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '이름',
  })
  name: string;

  @DateTimeColumn({
    update: false,
    comment: '가입일시',
  })
  createdAt: DateTime;

  @DateTimeColumn({
    comment: '수정일시',
  })
  updatedAt: DateTime;

  @OneToMany(() => Account, (e) => e.user)
  @JoinTable()
  accounts: Account[];

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
