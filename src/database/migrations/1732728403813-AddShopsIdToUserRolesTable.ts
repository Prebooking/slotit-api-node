import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddShopsIdToUserRolesTable1732728403813
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `role_user` ADD `shop_id` VARCHAR(36) DEFAULT NULL AFTER `role_id`;',
    );

    await queryRunner.query(
      'ALTER TABLE `role_user` ADD `shop_room_id` VARCHAR(36) DEFAULT NULL AFTER `shop_id`;',
    );

    await queryRunner.query(
      'ALTER TABLE `role_user` ADD FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE `role_user` ADD FOREIGN KEY (shop_room_id) REFERENCES shop_rooms(id) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE `role_user` DROP  `shop_id`;');
    queryRunner.query('ALTER TABLE `role_user` DROP  `shop_room_id`;');
  }
}
