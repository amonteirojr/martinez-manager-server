import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AlterTableAdmentmentsAddDeleteColumn1659668656838
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'admentments',
      new TableColumn({
        type: 'timestamp',
        name: 'deletedAt',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('admentments', 'deletedAt');
  }
}
