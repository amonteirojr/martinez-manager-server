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
  OneToOne,
} from 'typeorm';
import { BiddingModalityEnum } from '../../../enums/BiddingModality';
import { PaymentModesEnum } from '../../../enums/PaymentMode';
import { Customer } from '../../customer/entities/customer.entity';
import { Admentment } from '../../admentment/entities/admentment.entity';

@Entity({ name: 'contracts' })
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  contractId?: number;

  @Column()
  customerId: number;

  @Column({ width: 6 })
  ourContractNumber: string;

  @Column({ width: 4 })
  ourContractYear: string;

  @Column({ width: 6 })
  customerContractNumber?: string;

  @Column({ width: 4 })
  customerContractYear?: string;

  @Column()
  subject?: string;

  @Column()
  initialValue: number;

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

  @Column({ type: 'enum', enum: Object.keys(BiddingModalityEnum) })
  biddingModality: BiddingModalityEnum;

  @Column()
  biddingNumber: string;

  @Column()
  biddingModalityNumber: number;

  @Column()
  readjustmentIndex?: string;

  @Column({ type: 'enum', enum: Object.keys(PaymentModesEnum) })
  paymentMode: PaymentModesEnum;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Customer, (customer) => customer.contracts)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => File, (file) => file.contract)
  @JoinColumn({ name: 'contractId' })
  files?: File[];

  @OneToOne(() => Admentment)
  @JoinColumn({ name: 'contractId' })
  admentment?: Admentment;
}
