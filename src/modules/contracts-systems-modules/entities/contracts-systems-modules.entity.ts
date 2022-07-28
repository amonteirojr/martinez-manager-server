import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { SystemsModulesType } from '../../../enums/SystemsModulesType';

@Entity({ name: 'contracts_systems_modules' })
export class ContractsSystemsModules extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id?: number;

  @Column()
  type: SystemsModulesType;

  @Column()
  systemModuleId: number;

  @Column()
  deploymentDate?: string;

  @Column()
  deploymentResponsible?: string;

  @Column()
  comments?: string;

  @Column()
  contractId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
