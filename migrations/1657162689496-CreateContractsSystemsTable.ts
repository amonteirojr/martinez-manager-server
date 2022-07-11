import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateContractsSystemsTable1657162689496
  implements MigrationInterface
{
  table = new Table({
    name: 'contracts_systems',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'systemId',
        type: 'integer',
      },
      {
        name: 'contractId',
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

    await queryRunner.createForeignKeys(this.table, [
      new TableForeignKey({
        columnNames: ['systemId'],
        referencedColumnNames: ['systemId'],
        referencedTableName: 'systems',
        name: 'FK_CONTRACTS_SYSTEMS_SYSTEMS',
      }),
      new TableForeignKey({
        columnNames: ['contractId'],
        referencedColumnNames: ['contractId'],
        referencedTableName: 'contracts',
        name: 'FK_CONTRACTS_SYSTEMS_CONTRACTS',
      }),
    ]);

    await queryRunner.createUniqueConstraint(
      this.table,
      new TableUnique({
        columnNames: ['systemId', 'contractId'],
        name: 'UK_CONTRACTS_SYSTEMS',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
