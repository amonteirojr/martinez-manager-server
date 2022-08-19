import { SystemsModulesType } from '../src/enums/SystemsModulesType';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateContractsSystemsTable1657162689496
  implements MigrationInterface
{
  table = new Table({
    name: 'contracts_systems_modules',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'type',
        type: 'enum',
        enum: Object.keys(SystemsModulesType),
      },
      {
        name: 'systemModuleId',
        type: 'integer',
      },
      {
        name: 'deploymentDate',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'deploymentResponsible',
        type: 'varchar(50)',
        isNullable: true,
      },
      {
        name: 'comments',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'value',
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
        name: 'FK_CONTRACTS_SYSTEMS_MODULES_CONTRACTS',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
