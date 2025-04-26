import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddShopIdToUsersTable1733941508384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users` ADD `shop_id` VARCHAR(36) DEFAULT NULL AFTER `id`;',
    );

    await queryRunner.query(
      'ALTER TABLE `users` ADD FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE `users` DROP  `shop_id`;');
  }
}
