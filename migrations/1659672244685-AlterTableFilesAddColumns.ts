import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableFilesAddColumns1659672244685
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'files',
      'contractId',
      new TableColumn({
        name: 'contractId',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'files',
      new TableColumn({
        type: 'integer',
        name: 'admentmentId',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        columnNames: ['admentmentId'],
        referencedColumnNames: ['admentmentId'],
        referencedTableName: 'admentments',
        name: 'FK_FILES_ADMENTMENT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('files', 'FK_FILES_ADMENTMENT');
    await queryRunner.dropColumn('files', 'admentmentId');
  }
}
