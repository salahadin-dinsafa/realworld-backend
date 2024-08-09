import { MigrationInterface, QueryRunner } from "typeorm";

export class ArticleBodyColumn1723203936647 implements MigrationInterface {
    name = 'ArticleBodyColumn1723203936647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`body\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`body\` varchar(255) NOT NULL`);
    }

}
