import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRolesTable1725028181742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_user',
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
            name: 'role_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'varchar',
            scale: 36,
            generationStrategy: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.query(
      'ALTER TABLE `role_user` ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `role_user` ADD FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role_user');
  }
}
