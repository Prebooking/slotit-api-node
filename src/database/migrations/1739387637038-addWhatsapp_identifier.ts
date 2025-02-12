import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWhatsappIdentifier1739387637038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `shops` ADD `whatsapp_identifier` VARCHAR(255) NULL DEFAULT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `shops` DROP COLUMN `whatsapp_identifier`;',
    );
  }
}
