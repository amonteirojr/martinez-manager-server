import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateUserTable1652583952286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
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
      'user',
      new TableUnique({ columnNames: ['email'], name: 'UK_EMAIL_1' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('user', 'UK_EMAIL_1');
    await queryRunner.dropTable('user');
  }
}
