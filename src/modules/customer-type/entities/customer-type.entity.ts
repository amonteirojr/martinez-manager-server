import { Customer } from 'src/modules/customer/entities/customer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'customer_types' })
export class CustomerType extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  typeId?: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Customer, (customer) => customer.customerType)
  @JoinColumn({ name: 'typeId' })
  customers?: Customer[];
}
