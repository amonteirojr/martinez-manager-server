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
        name: 'stateId',
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

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        columnNames: ['stateId'],
        referencedColumnNames: ['stateId'],
        referencedTableName: 'states',
        name: 'FK_CITIES_STATES',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
