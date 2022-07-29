import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Admentment } from '../../admentment/entities/admentment.entity';

@Entity({ name: 'admentment_types' })
export class AdmentmentType extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  admentmentTypeId?: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  createdAt?: string;

  @Column()
  updatedAt?: string;

  @OneToMany(() => Admentment, (admentment) => admentment.admentmentType)
  @JoinColumn({ name: 'admentmentTypeId' })
  admentments?: Admentment[];
}
