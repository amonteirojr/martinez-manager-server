import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableContractsSystemsModulesAddResponsibleFK1667875492211
  implements MigrationInterface
{
  tableName = 'contracts_systems_modules';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      this.tableName,
      'deploymentResponsible',
      new TableColumn({
        name: 'responsibleId',
        type: 'integer',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['responsibleId'],
        referencedColumnNames: ['responsibleId'],
        referencedTableName: 'responsibles',
        name: 'FK_CONTRACTS_SYSTEMS_MODULES_RESPONSIBLES',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_CONTRACTS_SYSTEMS_MODULES_RESPONSIBLES',
    );
  }
}
