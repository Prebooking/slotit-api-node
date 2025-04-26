import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBookingsTable1733940831781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
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
            name: 'user_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
            isNullable: true,
          },
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
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['booked', 'completed', 'canceled'], // ENUM type for MySQL
            default: "'booked'",
            isNullable: true,
          },
          {
            name: 'time_from',
            type: 'time',
            default: 0,
            isNullable: true,
          },
          {
            name: 'time_to',
            type: 'time',
            default: 0,
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'meta',
            type: 'json',
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
      'ALTER TABLE `bookings` ADD FOREIGN KEY (shop_room_id) REFERENCES shop_rooms(id) ON DELETE CASCADE',
    );

    await queryRunner.query(
      'ALTER TABLE `bookings` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `bookings` ADD FOREIGN KEY (`shop_service_id`) REFERENCES `shop_services`(`id`) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('time_slots');
  }
}
