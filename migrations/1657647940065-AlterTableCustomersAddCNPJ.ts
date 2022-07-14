import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableCustomersAddCNPJ1657647940065
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'document',
        type: 'varchar(14)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customers', 'document');
  }
}
