import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolesPermissionsTable1652918998495
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles_parmissions',
        columns: [
          {
            name: 'roleId',
            type: 'bytea',
            isPrimary: true,
          },
          {
            name: 'permissionId',
            type: 'bytea',
            isPrimary: true,
          },
          {
            type: 'timestamp',
            name: 'createdAt',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            type: 'timestamp',
            name: 'updatedAt',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles_permissions');
  }
}
