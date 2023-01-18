import { InvoiceStatusEnum } from 'src/enums/InvoiceStatus';
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableInvoicesAlterColumns1673837392561
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('invoices', 'customerId');
    await queryRunner.dropColumn('invoices', 'statusId');

    await queryRunner.addColumn(
      'invoices',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: Object.keys(InvoiceStatusEnum),
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('invoices', 'status');

    await queryRunner.addColumns('invoices', [
      new TableColumn({
        type: 'integer',
        name: 'customerId',
        isNullable: true,
      }),
      new TableColumn({
        type: 'integer',
        name: 'statusId',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      'invoices',
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['customerId'],
        referencedTableName: 'customers',
        name: 'FK_INVOICES_CUSTOMER',
      }),
    );
  }
}
