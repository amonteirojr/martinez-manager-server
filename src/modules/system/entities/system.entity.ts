import { SystemModule } from '../../system-module/entities/system-module.entity';
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

@Entity({ name: 'systems' })
export class System extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  systemId?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => SystemModule, (systemModule) => systemModule.system)
  @JoinColumn({ name: 'systemId' })
  systemModules?: SystemModule[];
}
