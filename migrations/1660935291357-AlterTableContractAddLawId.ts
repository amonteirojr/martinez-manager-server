import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableContractAddLawId1660935291357
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        type: 'integer',
        isNullable: true,
        name: 'lawId',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contracts', 'lawId');
  }
}
