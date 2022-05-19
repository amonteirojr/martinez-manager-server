import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateRoleTable1652918723159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'roleId',
            type: 'bytea',
            isPrimary: true,
          },
          {
            name: 'name',
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
      'role',
      new TableUnique({ columnNames: ['name'], name: 'UK_ROLE_NAME_1' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('role', 'UK_ROLE_NAME_1');
    await queryRunner.dropTable('role');
  }
}
