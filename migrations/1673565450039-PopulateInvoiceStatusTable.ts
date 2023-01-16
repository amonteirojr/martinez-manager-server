import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateInvoiceStatusTable1673565450039
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('invoice_status')
      .values([
        {
          statusId: 1,
          status: 'GENERATED',
          description: 'Nota fiscal gerada',
        },
        {
          statusId: 2,
          status: 'OPENED',
          description: 'Em aberto',
        },
        {
          statusId: 3,
          status: 'PAID',
          description: 'Paga',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `invoice_status`');
  }
}
