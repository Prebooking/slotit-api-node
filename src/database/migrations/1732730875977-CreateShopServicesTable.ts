import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShopServicesTable1732730875977
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shop_services',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            scale: 36,
            generationStrategy: 'uuid',
          },
          {
            name: 'shop_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
            isNullable: true,
          },
          {
            name: 'service_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'charge',
            type: 'decimal',
            precision: 20,
            scale: 2,
            default: 0.0,
          },
          {
            name: 'strike_through_charge',
            type: 'decimal',
            precision: 20,
            scale: 2,
            default: 0.0,
          },
          {
            name: 'time',
            type: 'int',
            default: 0,
            comment: 'in minutes',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(
      'ALTER TABLE `shop_services` ADD FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE `shop_services` ADD FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE SET NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_services');
  }
}
