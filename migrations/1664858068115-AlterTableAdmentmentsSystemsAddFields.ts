import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAdmentmentsSystemsAddFields1664858068115
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('admentments_systems_modules', [
      new TableColumn({
        name: 'deploymentDate',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'deploymentResponsible',
        type: 'varchar(50)',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('admentments_systems_modules', [
      'deploymentDate',
      'deploymentResponsible',
    ]);
  }
}
