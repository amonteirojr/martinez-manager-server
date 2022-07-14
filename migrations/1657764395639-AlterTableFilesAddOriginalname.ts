import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableFilesAddOriginalname1657764395639
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'originalName',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'originalName');
  }
}
