import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRolesPermissionsTable1652918998495
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles_permissions',
        columns: [
          {
            name: 'roleId',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
          },
          {
            name: 'permissionId',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
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

    await queryRunner.createForeignKeys('roles_permissions', [
      new TableForeignKey({
        columnNames: ['permissionId'],
        referencedColumnNames: ['permissionId'],
        referencedTableName: 'permissions',
        name: 'FK_ROLES_PERMISSIONS_PERMISSIONS_ID',
      }),
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['roleId'],
        referencedTableName: 'roles',
        name: 'FK_ROLES_PERMISSIONS_ROLES_ID',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles_permissions', true, true, true);
  }
}
