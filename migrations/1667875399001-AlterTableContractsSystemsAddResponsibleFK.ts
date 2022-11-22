import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTableContractsSystemsAddResponsibleFK1667875399001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('contracts_systems', [
      new TableForeignKey({
        columnNames: ['responsibleId'],
        referencedColumnNames: ['responsibleId'],
        referencedTableName: 'responsibles',
        name: 'FK_CONTRACTS_SYSTEMS_RESPONSIBLES',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'contracts_systems',
      'FK_CONTRACTS_SYSTEMS_RESPONSIBLES',
    );
  }
}
