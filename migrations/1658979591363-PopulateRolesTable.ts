import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateRolesTable1658979591363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { identifiers } = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values({
        name: 'DEVELOPER',
        description: 'Desenvolvedor',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        role: identifiers[0].roleId,
        email: 'amonteirojr@gmail.com',
        password:
          '$2b$08$8ijpE2W9La1SvP2NjlC/2.L6c40KoECHPCcDg7Or7zwbRToBNrqj.',
        firstname: 'Adriano',
        lastname: 'Monteiro',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `roles` WHERE name = "DEVELOPER"');
    await queryRunner.query(
      'DELETE FROM users WHERE email = "amonteirojr@gmail.com"',
    );
  }
}
