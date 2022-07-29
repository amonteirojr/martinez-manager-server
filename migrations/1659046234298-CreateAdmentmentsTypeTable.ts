import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAdmentmentsTypeTable1659046234298
  implements MigrationInterface
{
  table = new Table({
    name: 'admentment_types',
    columns: [
      {
        name: 'admentmentTypeId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'name',
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
