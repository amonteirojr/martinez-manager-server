import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableContractsSystemModules1666582845019
  implements MigrationInterface
{
  tableName = 'contracts_systems_modules';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'systemModuleId');

    await queryRunner.addColumns(this.tableName, [
      new TableColumn({
        name: 'systemId',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'moduleId',
        type: 'integer',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(this.tableName, ['systemId', 'moduleId']);

    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'systemModuleId',
        type: 'integer',
        isNullable: true,
      }),
    );
  }
}
