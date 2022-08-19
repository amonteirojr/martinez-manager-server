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

@Entity({ name: 'bidding_modalities' })
export class BiddingModality extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  biddingModalityId?: number;

  @Column()
  biddingModality: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.biddingModality)
  @JoinColumn({ name: 'biddingModalityId' })
  contracts?: Contract[];
}
