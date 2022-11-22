import { ContractsSystemsModules } from 'src/modules/contracts-systems-modules/entities/contracts-systems-modules.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'contracts_systems' })
export class ContractsSystems extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id?: number;

  @Column()
  systemId: number;

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
}
