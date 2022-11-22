import { SystemModule } from '../../system-module/entities/system-module.entity';
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
import { Contract } from 'src/modules/contract/entitites/contract.entity';
import { ContractsSystems } from 'src/modules/contracts-systems/entities/contracts-systems.entity';

@Entity({ name: 'systems' })
export class System extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  systemId?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => SystemModule, (systemModule) => systemModule.system)
  @JoinColumn({ name: 'systemId' })
  systemModules?: SystemModule[];
}
