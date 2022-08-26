import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/** it should be syncronize */
@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;
}
