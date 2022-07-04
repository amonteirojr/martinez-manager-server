import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatesTable1656899728628 implements MigrationInterface {
  private table = new Table({
    name: 'states',
    columns: [
      {
        name: 'stateId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar(50)',
      },
      {
        name: 'code',
        type: 'varchar(2)',
      },
      {
        name: 'ibgeCode',
        type: 'integer',
      },
      {
        type: 'timestamp',
        name: 'createdAt',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        type: 'timestamp',
        name: 'updatedAt',

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
