import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShopsTable1732300304408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shops',
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
            name: 'address',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'contact_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contact_phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_by',
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
      'ALTER TABLE `shops` ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shops');
  }
}
