import { Admentment } from 'src/modules/admentment/entities/admentment.entity';
import { ContractsSystems } from 'src/modules/contracts-systems/entities/contracts-systems.entity';
import { Responsible } from 'src/modules/responsible/entities/responsible.entity';
import { SystemModule } from 'src/modules/system-module/entities/system-module.entity';
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

@Entity({ name: 'contracts_systems_modules' })
export class ContractsSystemsModules extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id?: number;

  @Column()
  contractSystemId?: number;

  @Column()
  moduleId: number;

  @Column()
  admentmentId: number;

  @Column()
  deploymentDate?: string;

  @Column()
  responsibleId?: number;

  @Column()
  comments?: string;

  @Column()
  monthValue: number;

  @Column()
  installments: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => ContractsSystems, (system) => system.modules)
  @JoinColumn({ name: 'contractSystemId' })
  system?: ContractsSystems;

  @ManyToOne(() => SystemModule)
  @JoinColumn({ name: 'moduleId' })
  module?: SystemModule;

  @ManyToOne(() => Responsible)
  @JoinColumn({ name: 'responsibleId' })
  responsible?: Responsible;
}
