import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateUsersTable1655696194528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'userId',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'identity',
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar(50)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'firstname',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'lastname',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'roleId',
            type: 'integer',
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
      'users',
      new TableUnique({ columnNames: ['email'], name: 'UK_EMAIL_1' }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'FK_USERS_ROLES',
        referencedColumnNames: ['roleId'],
        referencedTableName: 'roles',
        columnNames: ['roleId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('user', 'UK_EMAIL_1');
    await queryRunner.dropTable('user', true, true, true);
  }
}
