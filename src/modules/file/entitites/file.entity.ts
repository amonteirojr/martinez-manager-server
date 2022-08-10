import { Contract } from '../../contract/entitites/contract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Admentment } from '../../admentment/entities/admentment.entity';

@Entity({ name: 'files' })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  fileId?: number;

  @Column()
  contractId?: number;

  @Column()
  admentmentId?: number;

  @Column()
  fileName: string;

  @Column()
  originalName: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Contract, (contract) => contract.files)
  @JoinColumn({ name: 'contractId' })
  contract?: Contract;

  @ManyToOne(() => Admentment, (admentment) => admentment.files)
  @JoinColumn({ name: 'admentmentId' })
  admentment?: Admentment;
}
