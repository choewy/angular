import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/** it should not be syncronize */
@Entity({ synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
}
