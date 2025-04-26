import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddBookinsServicesTable1738655490865
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'booking_service',
        columns: [
          {
            name: 'booking_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
            isNullable: true,
          },
          {
            name: 'shop_service_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.query(
      'ALTER TABLE `booking_service` ADD FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE `booking_service` ADD FOREIGN KEY (`shop_service_id`) REFERENCES `shop_services`(`id`) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('booking_service');
  }
}
