import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoomService1736953858765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'room_service',
        columns: [
          {
            name: 'shop_room_id',
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
      'ALTER TABLE `room_service` ADD FOREIGN KEY (shop_room_id) REFERENCES shop_rooms(id) ON DELETE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE `room_service` ADD FOREIGN KEY (`shop_service_id`) REFERENCES `shop_services`(`id`) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('room_service');
  }
}
