import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableContractsAddResponsible1667871975102
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'contracts',
      'responsible',
      new TableColumn({
        name: 'responsibleId',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['responsibleId'],
        referencedColumnNames: ['responsibleId'],
        referencedTableName: 'responsibles',
        name: 'FK_CONTRACTS_RESPONSIBLES',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('contracts', 'FK_CONTRACTS_RESPONSIBLES');

    await queryRunner.changeColumn(
      'contracts',
      'responsibleId',
      new TableColumn({
        name: 'responsible',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
  }
}
