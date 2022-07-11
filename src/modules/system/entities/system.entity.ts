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
import { Contract } from '../../../modules/contract/entitites/contract.entity';

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

  @OneToMany(() => Contract, (contract) => contract.system)
  @JoinColumn({ name: 'contractId' })
  contracts?: Contract[];
}
