import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableInvoicesAddValue1673583736520
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'invoices',
      new TableColumn({
        type: 'decimal',
        isNullable: true,
        name: 'value',
      }),
    );

    await queryRunner.createForeignKey(
      'invoices',
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['customerId'],
        referencedTableName: 'customers',
        name: 'FK_INVOICES_CUSTOMER',
      }),
    );

    await queryRunner.createForeignKey(
      'invoices',
      new TableForeignKey({
        columnNames: ['contractId'],
        referencedColumnNames: ['contractId'],
        referencedTableName: 'contracts',
        name: 'FK_INVOICES_CONTRACT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contracts', 'value');
  }
}
