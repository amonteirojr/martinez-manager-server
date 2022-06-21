import { Permission } from '../../permission/entities/permission.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  roleId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_permissions',
    joinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }],
    inverseJoinColumns: [
      { name: 'permissionId', referencedColumnName: 'permissionId' },
    ],
  })
  permissions?: Permission[];
}
