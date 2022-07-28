import { System } from '../../system/entities/system.entity';
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

@Entity({ name: 'modules' })
export class SystemModule extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  moduleId?: number;

  @Column()
  name: string;

  @Column()
  systemId?: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => System, (system) => system.systemModules)
  @JoinColumn({ name: 'systemId' })
  system?: System;
}
