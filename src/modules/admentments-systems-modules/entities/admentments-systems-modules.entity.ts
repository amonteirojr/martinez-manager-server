import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { SystemsModulesType } from '../../../enums/SystemsModulesType';

@Entity({ name: 'admentments_systems_modules' })
export class AdmentmentsSystemsModules extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id?: number;

  @Column()
  type: SystemsModulesType;

  @Column()
  systemModuleId: number;

  @Column()
  comments?: string;

  @Column()
  installments?: number;

  @Column()
  monthValue?: number;

  @Column()
  deploymentDate?: string;

  @Column()
  deploymentResponsible?: string;

  @Column()
  admentmentId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
