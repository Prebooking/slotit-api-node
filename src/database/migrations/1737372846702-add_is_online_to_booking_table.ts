import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsOnlineToBookingTable1737372846702
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `bookings` ADD `is_online` BOOLEAN DEFAULT true AFTER `status`;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `booking` DROP `is_online`;');
  }
}
