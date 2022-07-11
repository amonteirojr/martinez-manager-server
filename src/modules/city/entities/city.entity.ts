import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Customer } from '../../../modules/customer/entities/customer.entity';

@Entity({ name: 'cities' })
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  cityId?: number;

  @Column()
  cityName: string;

  @Column()
  cityPopulation: number;

  @Column()
  ibgeCode: number;

  @Column({ width: 2 })
  state: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Customer, (customer) => customer.city)
  customers?: Customer[];
}
