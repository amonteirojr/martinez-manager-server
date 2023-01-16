import { InvoiceStatusEnum } from 'src/enums/InvoiceStatus';
import { Contract } from 'src/modules/contract/entitites/contract.entity';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  invoiceId: number;

  @Column()
  invoiceNumber: string;

  @Column()
  invoiceDate: string;

  @Column()
  contractId?: number;

  @Column()
  paymentDate?: string;

  @Column()
  value?: number;

  @Column()
  status?: InvoiceStatusEnum;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Contract, (contract) => contract.invoices)
  @JoinColumn({ name: 'contractId' })
  contract?: Contract;
}
