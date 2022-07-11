import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableCustomersAddTypeId1657505910089
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'typeId',
        type: 'integer',
      }),
    );

    await queryRunner.createForeignKey(
      'customers',
      new TableForeignKey({
        columnNames: ['typeId'],
        referencedColumnNames: ['typeId'],
        referencedTableName: 'customer_types',
        name: 'FK_CUSTOMERS_CUSTOMERS_TYPE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customers', 'typeId');
  }
}
