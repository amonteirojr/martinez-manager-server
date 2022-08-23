import { Contract } from 'src/modules/contract/entitites/contract.entity';
import { LawArticle } from 'src/modules/law-article/entities/law-article.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('laws')
export class Law extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  lawId?: number;

  @Column()
  lawNumber: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Contract, (contract) => contract.law)
  @JoinColumn({ name: 'lawId' })
  contracts?: Contract[];

  @OneToMany(() => LawArticle, (lawArticle) => lawArticle.law)
  @JoinColumn({ name: 'lawId' })
  articles?: LawArticle[];
}
