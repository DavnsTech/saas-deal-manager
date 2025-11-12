import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1678886400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            length: '100',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
