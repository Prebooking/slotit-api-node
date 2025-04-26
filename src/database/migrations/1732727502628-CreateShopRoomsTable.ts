import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShopRoomsTable1732727502628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shop_rooms',
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
      'ALTER TABLE `shop_rooms` ADD FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_rooms');
  }
}
