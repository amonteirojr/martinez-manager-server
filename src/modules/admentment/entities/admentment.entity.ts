import { AdmentmentsSystemsModules } from '../../admentments-systems-modules/entities/admentments-systems-modules.entity';
import { File } from '../../file/entitites/file.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @DeleteDateColumn()
  deletedAt?: string;

  @ManyToOne(() => Contract, (contract) => contract.admentments)
  @JoinColumn({ name: 'contractId' })
  contract?: Contract;

  @ManyToOne(
    () => AdmentmentType,
    (admentmentType) => admentmentType.admentments,
  )
  @JoinColumn({ name: 'admentmentTypeId' })
  admentmentType?: AdmentmentType;

  @OneToMany(() => File, (file) => file.admentment)
  @JoinColumn({ name: 'admentmentId' })
  files?: File[];

  @ManyToMany(() => AdmentmentsSystemsModules)
  @JoinTable({
    name: 'admentments_systems_modules',
    joinColumn: { name: 'admentmentId' },
    inverseJoinColumn: { name: 'id' },
  })
  systems: AdmentmentsSystemsModules[];
}
