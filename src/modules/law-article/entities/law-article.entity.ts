import { Contract } from 'src/modules/contract/entitites/contract.entity';
import { Law } from 'src/modules/law/entities/law.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('law_articles')
export class LawArticle extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  articleId?: number;

  @Column()
  article: string;

  @Column()
  description?: string;

  @Column()
  lawId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Law, (law) => law.articles)
  @JoinColumn({ name: 'lawId' })
  law?: Law;

  @OneToMany(() => Contract, (contract) => contract.lawArticle)
  @JoinColumn({ name: 'lawId' })
  contracts?: Contract[];
}
