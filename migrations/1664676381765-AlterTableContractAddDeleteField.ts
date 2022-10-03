import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableContractAddDeleteField1664676381765
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contracts', 'deletedAt');
  }
}
