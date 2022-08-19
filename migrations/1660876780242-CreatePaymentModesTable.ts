import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentModesTable1660876780242
  implements MigrationInterface
{
  table = new Table({
    name: 'payment_modes',
    columns: [
      {
        name: 'paymentModeId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'paymentMode',
        type: 'varchar(20)',
      },
      {
        name: 'description',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
