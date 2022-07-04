import { Contract } from '../../../modules/contract/entitites/contract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  customerId: number;

  @Column()
  customerName: string;

  @Column()
  cityName: string;

  @Column()
  cityPopulation: number;

  @Column({ width: 4 })
  ibgeId?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.customer)
  contracts?: Contract;
}
