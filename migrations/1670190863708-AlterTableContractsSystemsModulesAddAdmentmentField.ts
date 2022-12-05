import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableContractsSystemsModulesAddAdmentmentField1670190863708
  implements MigrationInterface
{
  tableName = 'contracts_systems';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'admentmentId',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['admentmentId'],
        referencedColumnNames: ['admentmentId'],
        referencedTableName: 'admentments',
        name: 'FK_CONTRACTS_SYSTEMS_ADMENTMENTS',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_CONTRACTS_SYSTEMS_MODULES_ADMENTMENTS',
    );

    await queryRunner.dropColumn(this.tableName, 'admentmentId');
  }
}
