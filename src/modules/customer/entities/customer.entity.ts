import { CustomerType } from '../../../modules/customer-type/entities/customer-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
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
  cityId: number;

  @Column()
  typeId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => Contract)
  contract?: Contract;

  @ManyToOne(() => CustomerType, (customerType) => customerType.customers)
  @JoinColumn({ name: 'typeId' })
  customerType?: CustomerType;

  @ManyToOne(() => City, (city) => city.customers)
  @JoinColumn({ name: 'cityId' })
  city?: City;
}
