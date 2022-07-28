import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableModules1658278152104 implements MigrationInterface {
  table = new Table({
    name: 'modules',
    columns: [
      {
        name: 'moduleId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar(30)',
      },
      {
        name: 'description',
        type: 'varchar(100)',
        isNullable: true,
      },
      {
        name: 'systemId',
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
        columnNames: ['systemId'],
        referencedColumnNames: ['systemId'],
        referencedTableName: 'systems',
        name: 'FK_MODULES_SYSTEMS',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
