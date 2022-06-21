import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
} from 'typeorm';

export class CreateCustomerTable1655695598209 implements MigrationInterface {
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
        name: 'cityName',
        type: 'varchar(100)',
      },
      {
        name: 'cityPopulation',
        type: 'integer',
      },
      {
        name: 'ibgeId',
        type: 'integer',
      },
    ];

    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: tableFields,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers', true, true, true);
  }
}
