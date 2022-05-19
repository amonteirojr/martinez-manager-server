import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  AfterLoad,
  AfterInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import * as uuid from 'uuid';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  roleId: Buffer;

  @Column({ unique: true })
  name: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }],
    inverseJoinColumns: [{ name: 'userId', referencedColumnName: 'userId' }],
  })
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'roles_parmissions',
    joinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }],
    inverseJoinColumns: [
      { name: 'permissionId', referencedColumnName: 'permissionId' },
    ],
  })
  permissions: Permission[];

  getUuid() {
    return typeof this.roleId === 'string'
      ? this.roleId
      : uuid.stringify(this.roleId);
  }

  getParsedUuid() {
    return Buffer.from(uuid.parse(this.roleId));
  }

  @BeforeInsert()
  setUuid() {
    this.roleId = Buffer.from(uuid.parse(uuid.v4()));
  }

  @AfterInsert()
  @AfterLoad()
  stringifyUuid() {
    this.roleId = this.roleId && uuid.stringify(this.roleId);
  }
}
