import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBiddingModalities1660885016467
  implements MigrationInterface
{
  table = new Table({
    name: 'bidding_modalities',
    columns: [
      {
        name: 'biddingModalityId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'biddingModality',
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
