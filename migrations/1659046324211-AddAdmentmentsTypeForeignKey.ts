import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddAdmentmentsTypeForeignKey1659046324211
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('admentments', [
      new TableForeignKey({
        columnNames: ['admentmentTypeId'],
        referencedColumnNames: ['admentmentTypeId'],
        referencedTableName: 'admentment_types',
        name: 'FK_ADMENTMENTS_ADMENTMENTS_TYPES',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'admentments',
      'FK_ADMENTMENTS_ADMENTMENTS_TYPES',
    );
  }
}
