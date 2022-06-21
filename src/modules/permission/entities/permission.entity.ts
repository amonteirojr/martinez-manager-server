import { Role } from '../../role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  permissionId: number;

  @Column({ unique: true })
  key: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'roles_permissions',
    joinColumns: [
      { name: 'permissionId', referencedColumnName: 'permissionId' },
    ],
    inverseJoinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }],
  })
  roles: Role[];
}
