import { BiddingModalityEnum } from '../src/enums/BiddingModality';
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableContractAlterColumnBiddingModality1660885098408
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contracts', 'biddingModality');

    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        type: 'integer',
        isNullable: true,
        name: 'biddingModalityId',
      }),
    );

    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['biddingModalityId'],
        referencedColumnNames: ['biddingModalityId'],
        name: 'FK_CONTRACTS_BIDDING_MODALITIES',
        referencedTableName: 'bidding_modalities',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'contracts',
      'FK_CONTRACTS_BIDDING_MODALITIES',
    );
    await queryRunner.dropColumn('contracts', 'biddingModalityId');

    await queryRunner.addColumn(
      'contracts',
      new TableColumn({
        name: 'biddingModality',
        type: 'enum',
        enum: Object.keys(BiddingModalityEnum),
      }),
    );
  }
}
