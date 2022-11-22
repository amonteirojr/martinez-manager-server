import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableContractsSystems1667867218641
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
        name: 'deploymentDate',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'responsibleId',
        type: 'integer',
        isNullable: true,
      },
      {
        name: 'comments',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'installments',
        type: 'integer',
        default: 1,
      },
      {
        name: 'monthValue',
        type: 'decimal',
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
        columnNames: ['contractId'],
        referencedColumnNames: ['contractId'],
        referencedTableName: 'contracts',
        name: 'FK_CONTRACTS_SYSTEMS_CONTRACT',
      }),
    ]);

    await queryRunner.createForeignKeys(this.table, [
      new TableForeignKey({
        columnNames: ['systemId'],
        referencedColumnNames: ['systemId'],
        referencedTableName: 'systems',
        name: 'FK_CONTRACTS_SYSTEMS_SYSTEMS',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
