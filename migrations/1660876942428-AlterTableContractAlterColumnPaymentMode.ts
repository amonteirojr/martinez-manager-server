import { PaymentModesEnum } from '../src/enums/PaymentMode';
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableContractAlterColumnPaymentMode1660876942428
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contracts', 'paymentMode');

    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        type: 'integer',
        isNullable: true,
        name: 'paymentModeId',
      }),
    );

    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['paymentModeId'],
        referencedColumnNames: ['paymentModeId'],
        name: 'FK_CONTRACTS_PAYMENT_MODES',
        referencedTableName: 'payment_modes',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('contracts', 'FK_CONTRACTS_PAYMENT_MODES');
    await queryRunner.dropColumn('contracts', 'paymentModeId');

    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        name: 'paymentMode',
        type: 'enum',
        enum: Object.keys(PaymentModesEnum),
      }),
    );
  }
}
