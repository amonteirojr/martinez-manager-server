import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCitiesTable1656901769457 implements MigrationInterface {
  private table = new Table({
    name: 'cities',
    columns: [
      {
        name: 'cityId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'cityName',
        type: 'varchar(100)',
      },
      {
        name: 'cityPopulation',
        type: 'integer',
      },
      {
        name: 'ibgeCode',
        type: 'integer',
      },
      {
        name: 'state',
        type: 'varchar(2)',
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
