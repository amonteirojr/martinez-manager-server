import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableInvoiceStatus1673565193915
  implements MigrationInterface
{
  table = new Table({
    name: 'invoice_status',
    columns: [
      {
        name: 'statusId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'status',
        type: 'varchar(20)',
      },
      {
        name: 'description',
        type: 'varchar(50)',
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
