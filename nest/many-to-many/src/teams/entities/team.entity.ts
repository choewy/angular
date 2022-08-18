import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('service_team')
export class TeamEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (entity) => entity.teams, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  users: UserEntity[];
}
