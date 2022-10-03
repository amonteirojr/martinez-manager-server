import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class CreateContractUniqueKey1664501094630
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'contracts',
      new TableUnique({
        columnNames: ['contractNumber', 'contractYear'],
        name: 'UK_CONTRACT_NUMBER',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('contracts', 'UK_CONTRACT_NUMBER');
  }
}
