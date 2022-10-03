import { File } from '../../file/entitites/file.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Admentment } from '../../admentment/entities/admentment.entity';
import { ContractsSystemsModules } from '../../contracts-systems-modules/entities/contracts-systems-modules.entity';
import { PaymentMode } from '../../payment-mode/entities/payment-mode.entity';
import { BiddingModality } from 'src/modules/bidding-modality/entities/bidding-modality.entity';
import { Law } from 'src/modules/law/entities/law.entity';

@Entity({ name: 'contracts' })
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  contractId?: number;

  @Column()
  customerId: number;

  @Column({ width: 6 })
  contractNumber: string;

  @Column({ width: 4 })
  contractYear: string;

  @Column()
  subject?: string;

  @Column()
  monthValue: number;

  @Column()
  installments: number;

  @Column()
  signatureDate: string;

  @Column()
  initialValidity: string;

  @Column()
  finalValidity: string;

  @Column()
  responsible: string;

  @Column()
  customerResponsible: string;

  @Column()
  biddingModalityId: number;

  @Column()
  biddingNumber: string;

  @Column()
  biddingYear: string;

  @Column()
  biddingModalityNumber: number;

  @Column()
  readjustmentIndex?: string;

  @Column()
  paymentModeId?: number;

  @Column()
  lawId?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  totalValue?: number;

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => PaymentMode, (paymentMode) => paymentMode.contracts)
  @JoinColumn({ name: 'paymentModeId' })
  paymentMode?: PaymentMode;

  @ManyToOne(
    () => BiddingModality,
    (biddingModality) => biddingModality.contracts,
  )
  @JoinColumn({ name: 'biddingModalityId' })
  biddingModality?: BiddingModality;

  @OneToMany(() => File, (file) => file.contract)
  @JoinColumn({ name: 'contractId' })
  files?: File[];

  @OneToMany(() => Admentment, (admentment) => admentment.contract)
  @JoinColumn({ name: 'contractId' })
  admentments?: Admentment[];

  @ManyToOne(() => Law, (law) => law.contracts)
  @JoinColumn({ name: 'lawId' })
  law?: Law;

  @ManyToMany(() => ContractsSystemsModules)
  @JoinTable({
    name: 'contracts_systems_modules',
    joinColumn: { name: 'contractId' },
    inverseJoinColumn: { name: 'id' },
  })
  systems?: ContractsSystemsModules[];
}
