import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAmountToTable1738696964004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `bookings` ADD `amount` DECIMAL(10,2) DEFAULT 0.00 AFTER `is_online`;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `bookings` DROP COLUMN `amount`;');
  }
}
