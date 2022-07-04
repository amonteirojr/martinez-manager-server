import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKey,
} from 'typeorm';

export class CreateCustomersTable1656901810966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableName = 'customers';
    const tableFields: TableColumnOptions[] = [
      {
        name: 'customerId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'customerName',
        type: 'varchar(100)',
      },
      {
        name: 'cityId',
        type: 'integer',
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
    ];

    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: tableFields,
      }),
    );

    await queryRunner.createForeignKey(
      'customers',
      new TableForeignKey({
        columnNames: ['cityId'],
        referencedColumnNames: ['cityId'],
        referencedTableName: 'cities',
        name: 'FK_CUSTOMERS_CITIES',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers', true, true, true);
  }
}
