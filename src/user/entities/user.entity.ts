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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: Buffer;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname?: string;

  @Column('bool', { default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'userId', referencedColumnName: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId', referencedColumnName: 'roleId' }],
  })
  roles: Role[];

  getUuid() {
    return typeof this.userId === 'string'
      ? this.userId
      : uuid.stringify(this.userId);
  }

  getParsedUuid() {
    return Buffer.from(uuid.parse(this.userId));
  }

  @BeforeInsert()
  setUuid() {
    this.userId = Buffer.from(uuid.parse(uuid.v4()));
  }

  @AfterInsert()
  @AfterLoad()
  stringifyUuid() {
    this.userId = this.userId && uuid.stringify(this.userId);
  }
}
