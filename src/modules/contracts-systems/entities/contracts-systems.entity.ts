import { ContractsSystemsModules } from 'src/modules/contracts-systems-modules/entities/contracts-systems-modules.entity';
import { Responsible } from 'src/modules/responsible/entities/responsible.entity';
import { System } from 'src/modules/system/entities/system.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'contracts_systems' })
export class ContractsSystems extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id?: number;

  @Column()
  systemId: number;

  @Column()
  admentmentId?: number;

  @Column()
  deploymentDate?: string;

  @Column()
  comments?: string;

  @Column()
  responsibleId?: number;

  @Column()
  installments: number;

  @Column()
  monthValue: number;

  @Column()
  contractId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => ContractsSystemsModules, (modules) => modules.system)
  @JoinColumn({ name: 'contractSystemId' })
  modules?: ContractsSystemsModules[];

  @ManyToOne(() => System)
  @JoinColumn({ name: 'systemId' })
  system?: System;

  @ManyToOne(() => Responsible)
  @JoinColumn({ name: 'responsibleId' })
  responsible?: Responsible;
}
