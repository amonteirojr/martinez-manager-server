import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DropTableInvoiceStatus1673837666791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invoice_status');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }
}
