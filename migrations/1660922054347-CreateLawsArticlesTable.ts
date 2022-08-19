import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLawsArticlesTable1660922054347
  implements MigrationInterface
{
  table = new Table({
    name: 'law_articles',
    columns: [
      {
        name: 'articleId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'article',
        type: 'varchar(20)',
      },
      {
        name: 'lawId',
        type: 'integer',
      },
      {
        name: 'description',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        columnNames: ['lawId'],
        referencedColumnNames: ['lawId'],
        referencedTableName: 'laws',
        name: 'FK_LAW_ARTICLES_LAWS',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
