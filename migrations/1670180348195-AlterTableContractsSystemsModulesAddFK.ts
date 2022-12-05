import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTableContractsSystemsModulesAddFK1670180348195
  implements MigrationInterface
{
  tableName = 'contracts_systems_modules';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['moduleId'],
        referencedColumnNames: ['moduleId'],
        referencedTableName: 'modules',
        name: 'FK_CONTRACTS_SYSTEMS_MODULES_MODULE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_CONTRACTS_SYSTEMS_MODULES_MODULE',
    );
  }
}
