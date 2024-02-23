import { MigrationInterface, QueryRunner } from "typeorm";

export class UserImageColumn1708691982264 implements MigrationInterface {
    name = 'UserImageColumn1708691982264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`image\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`image\` varchar(255) NULL`);
    }

}
