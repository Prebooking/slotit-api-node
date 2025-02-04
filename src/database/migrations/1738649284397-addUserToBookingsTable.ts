import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserToBookingsTable1738649284397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `bookings` ADD `shop_service_ids` JSON DEFAULT NULL AFTER `status`;',
        );
        await queryRunner.query(
            'ALTER TABLE `bookings` ADD `userDetail` JSON DEFAULT NULL AFTER `shop_service_ids`;',
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `booking` DROP `shop_service_ids`;');
    }
}
