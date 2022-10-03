import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableContractAddQuantityFields1664501813221
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        name: 'installments',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'contracts',
      'initialValue',
      new TableColumn({
        name: 'monthValue',
        type: 'decimal',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'contracts',
      'monthValue',
      new TableColumn({
        name: 'initialValue',
        type: 'decimal',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumn('contracts', 'installments');
  }
}
