import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableInvoices1673565201159 implements MigrationInterface {
  table = new Table({
    name: 'invoices',
    columns: [
      {
        name: 'invoiceId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'invoiceNumber',
        type: 'varchar(9)',
      },
      {
        type: 'timestamp',
        name: 'invoiceDate',
        isNullable: true,
      },
      {
        type: 'integer',
        name: 'customerId',
        isNullable: true,
      },
      {
        type: 'integer',
        name: 'contractId',
        isNullable: true,
      },
      {
        name: 'statusId',
        type: 'integer',
      },
      {
        type: 'timestamp',
        name: 'paymentDate',
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
