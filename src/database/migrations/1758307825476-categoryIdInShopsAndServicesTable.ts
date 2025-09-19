import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CategoryIdInShopsAndServicesTable1758307825476
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add category_id column to shops table
    await queryRunner.addColumn(
      'shops',
      new TableColumn({
        name: 'category_id',
        type: 'varchar',
        length: '36',
        isNullable: true,
      }),
    );

    // Add category_id column to services table
    await queryRunner.addColumn(
      'services',
      new TableColumn({
        name: 'category_id',
        type: 'varchar',
        length: '36',
        isNullable: true,
      }),
    );

    // Create foreign key for shops
    await queryRunner.createForeignKey(
      'shops',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Create foreign key for services
    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys first
    await queryRunner.dropForeignKey('services', 'FK_services_category_id');
    await queryRunner.dropForeignKey('shops', 'FK_shops_category_id');

    // Drop columns
    await queryRunner.dropColumn('services', 'category_id');
    await queryRunner.dropColumn('shops', 'category_id');
  }
}
