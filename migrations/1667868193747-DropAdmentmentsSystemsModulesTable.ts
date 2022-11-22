import { SystemsModulesType } from 'src/enums/SystemsModulesType';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class DropAdmentmentsSystemsModulesTable1667868193747
  implements MigrationInterface
{
  table = new Table({
    name: 'admentments_systems_modules',
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
        name: 'comments',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'admentmentId',
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
      {
        name: 'installments',
        type: 'integer',
        isNullable: true,
      },
      {
        name: 'monthValue',
        type: 'decimal',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admentments_systems_modules');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKeys(this.table, [
      new TableForeignKey({
        columnNames: ['admentmentId'],
        referencedColumnNames: ['admentmentId'],
        referencedTableName: 'admentments',
        name: 'FK_ADMENTMENTS_SYSTEMS_MODULES_ADMENTMENTS',
      }),
    ]);

    await queryRunner.createForeignKeys('admentments', [
      new TableForeignKey({
        columnNames: ['admentmentTypeId'],
        referencedColumnNames: ['admentmentTypeId'],
        referencedTableName: 'admentment_types',
        name: 'FK_ADMENTMENTS_ADMENTMENTS_TYPES',
      }),
    ]);
  }
}
