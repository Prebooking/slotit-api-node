import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAttendedByKeyToBookingsTable1738763846159
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `bookings` ADD `staff_id` VARCHAR(36) NULL AFTER `amount`;',
    );
    await queryRunner.query(
      'ALTER TABLE `bookings` ADD `services_count` INT NULL AFTER `amount`;',
    );
    await queryRunner.query(
      'ALTER TABLE `bookings` ADD CONSTRAINT `FK_staff_id_user` FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`) ON DELETE SET NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `bookings` DROP FOREIGN KEY `FK_staff_id_user`;',
    );
    await queryRunner.query('ALTER TABLE `bookings` DROP COLUMN `staff_id`;');
    await queryRunner.query(
      'ALTER TABLE `bookings` DROP COLUMN `services_count`;',
    );
  }
}
