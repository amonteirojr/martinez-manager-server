import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAmendmentTable1659043863056 implements MigrationInterface {
  table = new Table({
    name: 'admentments',
    columns: [
      {
        name: 'admentmentId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'contractId',
        type: 'integer',
      },
      {
        name: 'admentmentNumber',
        type: 'varchar(20)',
      },
      {
        name: 'value',
        type: 'decimal',
        isNullable: true,
        default: 0,
      },
      {
        name: 'signatureDate',
        type: 'date',
        isNullable: true,
      },
      {
        name: 'initialDate',
        type: 'date',
        isNullable: true,
      },
      {
        name: 'finalDate',
        type: 'date',
        isNullable: true,
      },
      {
        name: 'admentmentTypeId',
        type: 'integer',
      },
      {
        name: 'responsible',
        type: 'varchar(100)',
        isNullable: true,
      },
      {
        name: 'comments',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'readjustment',
        type: 'decimal',
        isNullable: true,
      },
      {
        name: 'negotiatedReadjustment',
        type: 'decimal',
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

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        columnNames: ['contractId'],
        referencedColumnNames: ['contractId'],
        referencedTableName: 'contracts',
        name: 'FK_ADMENTMENTS_CONTRACTS',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
