import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLawsTable1660921725321 implements MigrationInterface {
  table = new Table({
    name: 'laws',
    columns: [
      {
        name: 'lawId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'lawNumber',
        type: 'varchar(40)',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
