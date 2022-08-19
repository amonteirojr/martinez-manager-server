import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableSystemModulesAlterRequiredColumns1660883251838
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'contracts_systems_modules',
      'value',
      new TableColumn({
        name: 'value',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'contracts_systems_modules',
      'value',
      new TableColumn({
        name: 'value',
        type: 'decimal',
      }),
    );
  }
}
