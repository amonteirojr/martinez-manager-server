import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AdmentmentType } from '../../admentment-type/entities/admentment-type.entity';
import { Contract } from '../../contract/entitites/contract.entity';

@Entity({ name: 'admentments' })
export class Admentment extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  admentmentId?: number;

  @Column()
  contractId: number;

  @Column()
  admentmentNumber: string;

  @Column()
  value?: number;

  @Column()
  signatureDate?: string;

  @Column()
  initialDate?: string;

  @Column()
  finalDate?: string;

  @Column()
  admentmentTypeId: number;

  @Column()
  responsible?: string;

  @Column()
  comments?: string;

  @Column()
  readjustment?: number;

  @Column()
  negotiatedReadjustment?: number;

  @Column()
  createdAt?: string;

  @Column()
  updatedAt?: string;

  @OneToOne(() => Contract)
  @JoinColumn({ name: 'contractId' })
  contract?: Contract;

  @ManyToOne(
    () => AdmentmentType,
    (admentmentType) => admentmentType.admentments,
  )
  @JoinColumn({ name: 'admentmentTypeId' })
  admentmentType?: AdmentmentType;
}
