import { TeamEntity } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('service_user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  name: string;

  @Column()
  account: string;

  @Column()
  password: string;

  @ManyToMany(() => TeamEntity, (entity) => entity.users, { cascade: true })
  @JoinTable()
  teams: TeamEntity[];
}
