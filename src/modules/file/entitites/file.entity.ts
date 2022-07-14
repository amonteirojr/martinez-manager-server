import { Contract } from '../../../modules/contract/entitites/contract.entity';
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

@Entity({ name: 'files' })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  fileId?: number;

  @Column()
  contractId: number;

  @Column()
  fileName: string;

  @Column()
  originalName: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.files)
  @JoinColumn({ name: 'contractId' })
  contract?: Contract;
}
