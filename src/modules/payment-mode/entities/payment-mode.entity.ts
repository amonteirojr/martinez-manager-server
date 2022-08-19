import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Contract } from 'src/modules/contract/entitites/contract.entity';

@Entity({ name: 'payment_modes' })
export class PaymentMode extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  paymentModeId?: number;

  @Column()
  paymentMode: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.paymentMode)
  @JoinColumn({ name: 'paymentModeId' })
  contracts?: Contract[];
}
