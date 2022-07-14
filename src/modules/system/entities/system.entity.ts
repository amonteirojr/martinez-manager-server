import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Contract)
  @JoinTable({
    name: 'contracts_systems',
    joinColumn: { name: 'systemId' },
    inverseJoinColumn: { name: 'contractId' },
  })
  contracts?: Contract[];
}
