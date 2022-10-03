import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAdmentmentsSystemModulesAlterValuesField1664675566772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'admentments_systems_modules',
      new TableColumn({
        name: 'installments',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'admentments_systems_modules',
      'newValue',
      new TableColumn({
        name: 'monthValue',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'admentments_systems_modules',
      'monthValue',
      new TableColumn({
        name: 'newValue',
        type: 'decimal',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumn('admentments_systems_modules', 'installments');
  }
}
