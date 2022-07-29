import { CustomerType } from '../../../modules/customer-type/entities/customer-type.entity';
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
} from 'typeorm';
import { City } from '../../../modules/city/entities/city.entity';
import { Contract } from '../../../modules/contract/entitites/contract.entity';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  customerId?: number;

  @Column()
  customerName: string;

  @Column()
  document: string;

  @Column()
  typeId: number;

  @Column()
  referenceContactName?: string;

  @Column()
  referenceContactPhone?: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  complement?: string;

  @Column()
  neighborhood: string;

  @Column()
  zipCode: string;

  @Column()
  cityId: number;

  @Column()
  customerSince: string;

  @Column()
  aditionalInfo: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.customer)
  @JoinColumn({ name: 'customerId' })
  contracts?: Contract[];

  @ManyToOne(() => CustomerType, (customerType) => customerType.customers)
  @JoinColumn({ name: 'typeId' })
  customerType?: CustomerType;

  @ManyToOne(() => City, (city) => city.customers)
  @JoinColumn({ name: 'cityId' })
  city?: City;
}
