import { Role } from '../../role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  userId?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname?: string;

  @Column()
  roleId?: number;

  @Column('bool', { default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role?: Role;
}
