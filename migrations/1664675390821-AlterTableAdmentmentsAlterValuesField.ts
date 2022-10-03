import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAdmentmentsAlterValuesField1664675390821
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'admentments',
      new TableColumn({
        name: 'installments',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'admentments',
      'value',
      new TableColumn({
        name: 'monthValue',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'admentments',
      'monthValue',
      new TableColumn({
        name: 'value',
        type: 'decimal',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumn('admentments', 'installments');
  }
}
