import { BiddingModalityEnum } from '../src/enums/BiddingModality';
import { PaymentModesEnum } from '../src/enums/PaymentMode';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateContractsTable1656901842840 implements MigrationInterface {
  table = new Table({
    name: 'contracts',
    columns: [
      {
        name: 'contractId',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'identity',
        isGenerated: true,
      },
      {
        name: 'customerId',
        type: 'integer',
      },
      {
        name: 'ourContractNumber',
        type: 'varchar(6)',
      },
      {
        name: 'ourContractYear',
        type: 'varchar(4)',
      },
      {
        name: 'customerContractNumber',
        type: 'varchar(6)',
        isNullable: true,
      },
      {
        name: 'customerContractYear',
        type: 'varchar(4)',
        isNullable: true,
      },
      {
        name: 'subject',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'initialValue',
        type: 'decimal',
      },
      {
        name: 'signatureDate',
        type: 'date',
      },
      {
        name: 'initialValidity',
        type: 'date',
      },
      {
        name: 'finalValidity',
        type: 'date',
      },
      {
        name: 'responsible',
        type: 'varchar(100)',
      },
      {
        name: 'customerResponsible',
        type: 'varchar(100)',
      },
      {
        name: 'biddingClassification',
        type: 'varchar',
      },
      {
        name: 'biddingModality',
        type: 'enum',
        enum: Object.keys(BiddingModalityEnum),
      },
      {
        name: 'biddingModalityNumber',
        type: 'integer',
      },
      {
        name: 'readjustmentIndex',
        type: 'varchar(10)',
        isNullable: true,
      },
      {
        name: 'paymentMode',
        type: 'enum',
        enum: Object.keys(PaymentModesEnum),
      },
      {
        type: 'timestamp',
        name: 'createdAt',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        type: 'timestamp',
        name: 'updatedAt',

        default: 'CURRENT_TIMESTAMP',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        columnNames: ['customerId'],
        referencedColumnNames: ['customerId'],
        referencedTableName: 'customers',
        name: 'FK_CONTRACTS_CUSTOMERS_ID',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contracts', true, true, true);
  }
}
