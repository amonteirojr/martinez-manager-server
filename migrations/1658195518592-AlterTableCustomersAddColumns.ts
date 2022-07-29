import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableCustomersAddColumns1658195518592
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('customers', [
      new TableColumn({
        name: 'referenceContactName',
        type: 'varchar(50)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'referenceContactPhone',
        type: 'varchar(11)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'address',
        type: 'varchar(100)',
      }),
      new TableColumn({
        name: 'number',
        type: 'varchar(10)',
      }),
      new TableColumn({
        name: 'complement',
        type: 'varchar(50)',
        isNullable: true,
      }),
      new TableColumn({
        name: 'neighborhood',
        type: 'varchar(50)',
      }),
      new TableColumn({
        name: 'zipCode',
        type: 'varchar(9)',
      }),
      new TableColumn({
        name: 'customerSince',
        type: 'date',
        isNullable: true,
      }),
      new TableColumn({
        name: 'aditionalInfo',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phoneNumber',
        type: 'varchar(11)',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('customers', [
      'address',
      'number',
      'complement',
      'neighborhood',
      'zipCode',
      'referenceContactName',
      'referenceContactPhone',
    ]);
  }
}
