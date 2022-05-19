import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreatePermissionTable1652918119321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permission',
        columns: [
          {
            name: 'permissionId',
            type: 'bytea',
            isPrimary: true,
          },
          {
            name: 'key',
            type: 'varchar(50)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar(255)',
            isNullable: true,
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

    await queryRunner.createUniqueConstraint(
      'permission',
      new TableUnique({ columnNames: ['key'], name: 'UK_PERMISSION_KEY_1' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('permission', 'UK_PERMISSION_KEY_1');
    await queryRunner.dropTable('permission');
  }
}
