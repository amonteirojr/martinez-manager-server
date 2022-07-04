import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateRoleTable1652918723159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'roleId',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
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
      'roles',
      new TableUnique({ columnNames: ['name'], name: 'UK_ROLE_NAME_1' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('roles', 'UK_ROLE_NAME_1');
    await queryRunner.dropTable('roles');
  }
}
