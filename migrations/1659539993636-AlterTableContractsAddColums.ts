import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableContractsAddColums1659539993636
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'contracts',
      'ourContractNumber',
      'contractNumber',
    );

    await queryRunner.renameColumn(
      'contracts',
      'ourContractYear',
      'contractYear',
    );

    await queryRunner.dropColumns('contracts', [
      'customerContractNumber',
      'customerContractYear',
    ]);

    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        name: 'biddingYear',
        type: 'varchar(4)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'contracts',
      'contractNumber',
      'ourContractNumber',
    );

    await queryRunner.renameColumn(
      'contracts',
      'contractYear',
      'ourContractYear',
    );

    await queryRunner.dropColumns('contracts', ['biddingYear']);
  }
}
