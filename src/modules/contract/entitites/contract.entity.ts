import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { BiddingModalityEnum } from 'src/enums/BiddingModality';
import { PaymentModesEnum } from 'src/enums/PaymentMode';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Entity({ name: 'contracts' })
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  contractId: number;

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
  signatureDate: Date;

  @Column()
  initialValidity: Date;

  @Column()
  finalValidity: Date;

  @Column()
  responsible: string;

  @Column()
  customerResponsible: string;

  @Column()
  biddingClassification: string;

  @Column({ type: 'enum', enum: Object.keys(BiddingModalityEnum) })
  biddingModality: BiddingModalityEnum;

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
  customer?: Customer;
}
