import { SystemsModulesType } from '../src/enums/SystemsModulesType';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAdmentmentsSystemsTable1659046086941
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
        name: 'newValue',
        type: 'decimal',
        isNullable: true,
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
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKeys(this.table, [
      new TableForeignKey({
        columnNames: ['admentmentId'],
        referencedColumnNames: ['admentmentId'],
        referencedTableName: 'admentments',
        name: 'FK_ADMENTMENTS_SYSTEMS_MODULES_ADMENTMENTS',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true);
  }
}
