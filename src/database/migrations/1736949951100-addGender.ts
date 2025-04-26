import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGender1736949951100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `shop_services` ADD `gender` ENUM('male', 'female', 'other', 'common') DEFAULT 'common' AFTER `image`;",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE `shop_services` DROP  `gender`;');
  }
}
