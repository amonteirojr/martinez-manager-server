import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSystemsTable1657162257652 implements MigrationInterface {
  table = new Table({
    name: 'systems',
    columns: [
      {
        name: 'systemId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar(50)',
      },
      {
        name: 'description',
        type: 'text',
        isNullable: true,
      },
      {
        type: 'timestamp',
        name: 'createdAt',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        type: 'timestamp',
        name: 'updatedAt',

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
