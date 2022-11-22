import { SystemsModulesType } from 'src/enums/SystemsModulesType';
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableContractsSystemModules1667867537319
  implements MigrationInterface
{
  tableName = 'contracts_systems_modules';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_CONTRACTS_SYSTEMS_MODULES_CONTRACTS',
    );

    await queryRunner.dropColumns(this.tableName, [
      'type',
      'contractId',
      'systemId',
    ]);

    await queryRunner.addColumns(this.tableName, [
      new TableColumn({
        name: 'contractSystemId',
        type: 'integer',
      }),
    ]);

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['contractSystemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contracts_systems',
        name: 'FK_CONTRACTS_SYSTEMS_MODULES_CONTRACTS_SYSTEMS',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'FK_CONTRACTS_SYSTEMS_MODULES_CONTRACTS_SYSTEMS',
    );

    await queryRunner.dropColumn(this.tableName, 'contractSystemId');

    await queryRunner.addColumns(this.tableName, [
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: Object.keys(SystemsModulesType),
      }),
      new TableColumn({
        name: 'contractId',
        type: 'integer',
      }),
      new TableColumn({
        name: 'systemId',
        type: 'integer',
      }),
    ]);

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['contractId'],
        referencedColumnNames: ['contractId'],
        referencedTableName: 'contracts',
        name: 'FK_CONTRACTS_SYSTEMS_MODULES_CONTRACTS',
      }),
    ]);
  }
}
