import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  AfterInsert,
  AfterLoad,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import * as uuid from 'uuid';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  permissionId: Buffer;

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
    name: 'roles_parmissions',
    joinColumns: [
      { name: 'permissionId', referencedColumnName: 'permissionId' },
    ],
    inverseJoinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }],
  })
  roles: Role[];

  getUuid() {
    return typeof this.permissionId === 'string'
      ? this.permissionId
      : uuid.stringify(this.permissionId);
  }

  getParsedUuid() {
    return Buffer.from(uuid.parse(this.permissionId));
  }

  @BeforeInsert()
  setUuid() {
    this.permissionId = Buffer.from(uuid.parse(uuid.v4()));
  }

  @AfterInsert()
  @AfterLoad()
  stringifyUuid() {
    this.permissionId = this.permissionId && uuid.stringify(this.permissionId);
  }
}
