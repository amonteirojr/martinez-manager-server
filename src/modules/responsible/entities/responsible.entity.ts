import { Contract } from 'src/modules/contract/entitites/contract.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'responsibles' })
export class Responsible extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  responsibleId?: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.responsible)
  @JoinColumn({ name: 'responsibleId' })
  contracts?: Contract[];
}
