import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableContractSystemsAddValuesField1664674637409
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contracts_systems_modules',
      new TableColumn({
        name: 'installments',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'contracts_systems_modules',
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
      'contracts_systems_modules',
      'monthValue',
      new TableColumn({
        name: 'value',
        type: 'decimal',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumn('contracts_systems_modules', 'installments');
  }
}
